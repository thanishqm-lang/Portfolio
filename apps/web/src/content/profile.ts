/** Facts about the owner. Every line comes from the résumé (NS-30); nothing here is inferred. */
export const PROFILE = {
  fullName: 'Sri Thanishq Manda',
  role: 'QA Engineer | Automation Test Engineer',
  location: 'Hyderabad, India',
  about: {
    paragraphs: [
      "I'm a QA engineer with a year of experience testing web applications, both by hand and through automation. I design test cases around real user workflows, build automation with Playwright and Cucumber, and work with developers and product owners in Agile teams to find, report and close defects.",
      'Right now I am on a product analytics project for an enterprise AI platform, automating workflows with JavaScript and Cucumber and checking that the application stays reliable with and without network or power connectivity.',
    ],
    focusAreas: [
      'Manual testing',
      'Test automation',
      'Playwright',
      'Cucumber (BDD)',
      'CI/CD',
      'Agile',
    ],
    education: {
      degree: 'Bachelor of Technology, Computer Science and Engineering',
      school: 'Chaitanya Bharathi Institute of Technology (CBIT)',
      period: '2020 – 2024',
    },
  },
} as const;
