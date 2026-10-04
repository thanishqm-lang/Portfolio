import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { GlassPanel, MonoLabel } from '../components/ui';
import { PROJECTS } from '../content/projects';
import { SECTIONS, UI } from '../content/ui';
import { requestOpenProject } from '../events';
import { ASSISTANT_MOTION } from '../motion/tokens';
import { useReducedMotion } from '../motion/useReducedMotion';
import { ENGINE_ID, respond } from './engine';
import { SUGGESTED_QUESTIONS } from './knowledge';
import { RevealText, revealDuration } from './RevealText';

interface Message {
  id: number;
  role: 'user' | 'lab';
  text: string;
  /** A section to link to from an answer. */
  target?: string;
  /** A project whose detail dialog the answer's link opens. */
  projectId?: string;
  /** Show the starter chips under this message (a "did not understand" reply). */
  offerSuggestions?: boolean;
}

/**
 * The "Ask the Lab" chat. Everything runs in the browser; nothing is stored beyond this page view,
 * and a reset clears the conversation completely (NS-22). A short thinking pause and a word-by-word
 * reveal make answers feel alive; both are skipped under reduced motion and can be skipped by hand.
 * The full answer text is in the page from the first moment, so assistive technology reads it once.
 */
export default function AssistantPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [thinking, setThinking] = useState(false);
  const [revealingId, setRevealingId] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const nextId = useRef(1);
  const timers = useRef<number[]>([]);
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const clearTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages, thinking]);

  const ask = (question: string) => {
    if (thinking) return;
    const reply = respond(question);
    const user: Message[] =
      question.trim().length > 0
        ? [{ id: nextId.current++, role: 'user', text: question.trim() }]
        : [];
    const lab: Message =
      reply.kind === 'answer'
        ? {
            id: nextId.current++,
            role: 'lab',
            text: reply.entry.answer,
            ...(reply.entry.target !== undefined ? { target: reply.entry.target } : {}),
            ...(reply.entry.projectId !== undefined ? { projectId: reply.entry.projectId } : {}),
          }
        : {
            id: nextId.current++,
            role: 'lab',
            text: reply.reason === 'empty' ? UI.assistantEmpty : UI.assistantFallback,
            offerSuggestions: true,
          };

    setDraft('');
    setMessages((previous) => [...previous, ...user]);

    const showReply = () => {
      setThinking(false);
      setMessages((previous) => [...previous, lab]);
      if (!reducedMotion) {
        setRevealingId(lab.id);
        timers.current.push(
          window.setTimeout(() => setRevealingId(null), revealDuration(lab.text) + 300),
        );
      }
    };

    if (reducedMotion || user.length === 0) {
      showReply();
    } else {
      setThinking(true);
      timers.current.push(window.setTimeout(showReply, ASSISTANT_MOTION.thinkMs));
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    ask(draft);
    input.current?.focus();
  };

  const reset = () => {
    clearTimers();
    setMessages([]);
    setDraft('');
    setThinking(false);
    setRevealingId(null);
    input.current?.focus();
  };

  const chips = (
    <ul className="tag-list" aria-label={UI.assistantSuggestions}>
      {SUGGESTED_QUESTIONS.map((question) => (
        <li key={question}>
          <button type="button" className="chip-button" onClick={() => ask(question)}>
            {question}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <GlassPanel className="assistant" data-engine={ENGINE_ID}>
      <div className="assistant__header">
        <MonoLabel>{UI.assistantLab}</MonoLabel>
        <span className="assistant__status">
          <span className="assistant__dot" aria-hidden="true" />
          {UI.assistantStatus}
        </span>
        {messages.length > 0 && (
          <button type="button" className="chip-button assistant__reset" onClick={reset}>
            {UI.assistantReset}
          </button>
        )}
      </div>

      <div
        ref={log}
        className="assistant__log"
        role="log"
        aria-live="polite"
        aria-label={UI.assistantLogLabel}
        tabIndex={0}
      >
        {messages.length === 0 ? (
          <div className="assistant__intro">
            <p>{UI.assistantNote}</p>
            <MonoLabel>{UI.assistantSuggestions}</MonoLabel>
            {chips}
          </div>
        ) : (
          messages.map((message) => {
            const section = SECTIONS.find((entry) => entry.id === message.target);
            const project = PROJECTS.find((entry) => entry.id === message.projectId);
            const revealing = message.id === revealingId;
            return (
              <div
                key={message.id}
                className={
                  message.role === 'user'
                    ? 'assistant__message assistant__message--user'
                    : 'assistant__message assistant__message--lab'
                }
              >
                <MonoLabel>{message.role === 'user' ? UI.assistantYou : UI.assistantLab}</MonoLabel>
                {message.role === 'lab' ? (
                  <RevealText text={message.text} revealing={revealing} />
                ) : (
                  <p>{message.text}</p>
                )}
                {revealing && (
                  <button
                    type="button"
                    className="assistant__skip"
                    onClick={() => setRevealingId(null)}
                  >
                    {UI.assistantSkip}
                  </button>
                )}
                {project !== undefined ? (
                  <button
                    type="button"
                    className="assistant__link"
                    onClick={() => requestOpenProject(project.id)}
                  >
                    {UI.assistantOpen}: {project.title}
                  </button>
                ) : (
                  section !== undefined && (
                    <a className="assistant__link" href={`#${section.id}`}>
                      {UI.assistantSee}: {section.title}
                    </a>
                  )
                )}
                {message.offerSuggestions === true && chips}
              </div>
            );
          })
        )}
        {thinking && (
          <div className="assistant__message assistant__message--lab assistant__thinking" aria-hidden="true">
            <MonoLabel>{UI.assistantLab}</MonoLabel>
            <span className="assistant__dots">
              <span />
              <span />
              <span />
            </span>
          </div>
        )}
      </div>

      <form className="assistant__form" onSubmit={onSubmit}>
        <label className="visually-hidden" htmlFor={inputId}>
          {UI.assistantInputLabel}
        </label>
        <input
          ref={input}
          id={inputId}
          className="assistant__input"
          type="text"
          value={draft}
          placeholder={UI.assistantPlaceholder}
          autoComplete="off"
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit" className="button button--primary" disabled={thinking}>
          {UI.assistantSend}
        </button>
      </form>
    </GlassPanel>
  );
}
