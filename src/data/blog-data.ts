export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  lastUpdated?: string;
  readTime: string;
  author: string;
  authorRole: string;
  sections: { heading: string; content: string; bullets?: string[] }[];
  cta: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'federal-vs-provincial-employment-standards',
    title: 'Understanding Federal vs Provincial Employment Standards in Canada',
    excerpt: 'Navigate the complexities of Canadian employment law. Learn which standards apply to your business and how to ensure compliance across jurisdictions.',
    category: 'Compliance',
    date: 'February 10, 2024',
    readTime: '8 min read',
    author: 'Jeffrey T. Furtado',
    authorRole: 'HR Consultant & Compliance Expert',
    sections: [
      { heading: 'The Fundamental Difference', content: 'In Canada, employment standards are primarily governed by provincial legislation. However, approximately 6% of Canadian workplaces fall under federal jurisdiction. Understanding which applies to your organization is crucial for compliance.' },
      { heading: 'Federal Jurisdiction', content: 'The Canada Labour Code applies to federally regulated industries, including:', bullets: ['Interprovincial and international transportation (railways, airlines, shipping)', 'Telecommunications and broadcasting', 'Banking and financial institutions', 'First Nations band councils and Indigenous self-governments'] },
      { heading: 'Provincial Jurisdiction', content: 'The vast majority of Canadian employers fall under provincial employment standards. Each province and territory has its own legislation covering:', bullets: ['Minimum wage rates', 'Hours of work and overtime', 'Vacation and public holidays', 'Termination notice and severance', 'Leaves of absence (maternity, parental, sick, etc.)'] },
      { heading: 'Determining Your Jurisdiction', content: 'Start by confirming whether your business is federally or provincially regulated. This determination is based on the nature of your business operations, not your location or size. Employment standards are regularly updated — subscribe to updates from your relevant labour ministry.' },
      { heading: 'Multi-Provincial Operations', content: 'If you operate in multiple provinces, you must comply with the employment standards of each province where you have employees. This can create complex administrative requirements. When employment contracts or company policies provide greater benefits than minimum standards, those greater rights apply.' },
      { heading: 'Common Mistakes', content: 'Many employers make these critical errors:', bullets: ['Assuming federal standards apply when they don\'t', 'Not updating policies when legislation changes', 'Applying one province\'s rules to employees in another', 'Contracting below minimum employment standards'] },
      { heading: 'Best Practices', content: 'Review your employment practices annually to ensure compliance. Maintain clear records of hours worked, overtime, vacation taken, and leaves of absence. Ensure supervisors understand employment standards — many violations occur due to manager ignorance, not malice.' },
      { heading: 'When to Seek Help', content: 'Consider consulting with an HR professional when:', bullets: ['You\'re unsure about your jurisdictional status', 'You\'re expanding to new provinces or territories', 'You\'re implementing new policies or practices', 'You\'re facing an employment standards complaint', 'You\'re restructuring or conducting layoffs'] },
    ],
    cta: 'Let PreciseHR help you navigate federal and provincial employment standards with confidence.',
  },
  {
    id: 'workplace-investigations',
    title: 'The Essential Guide to Workplace Investigations',
    excerpt: 'Best practices for conducting fair, thorough, and legally compliant workplace investigations. Protect your organization while supporting your employees.',
    category: 'Workplace Culture',
    date: 'February 8, 2024',
    readTime: '10 min read',
    author: 'Jeffrey T. Furtado',
    authorRole: 'HR Consultant & Workplace Investigator',
    sections: [
      { heading: 'Why Investigations Matter', content: 'When allegations of misconduct arise, how you respond can make the difference between resolution and escalation. Failing to properly investigate can lead to legal liability, damaged morale, increased turnover, and reputational harm.' },
      { heading: 'When to Investigate', content: 'Not every complaint requires a formal investigation, but you should investigate when allegations involve:', bullets: ['Harassment or discrimination', 'Violence or threats of violence', 'Theft or fraud', 'Policy violations with serious consequences', 'Safety concerns'] },
      { heading: 'Step 1: Initial Response', content: 'Take the complaint seriously regardless of who is involved. Ensure the complainant\'s immediate safety, consider interim measures such as separation of parties or paid leave, document the initial complaint in detail, and maintain confidentiality to the extent possible.' },
      { heading: 'Step 2: Planning', content: 'Determine who will conduct the investigation, identify potential witnesses and evidence, review relevant policies and procedures, and establish a timeline for completion.' },
      { heading: 'Choosing an Investigator', content: 'The investigator should be impartial and free from conflicts of interest, trained in investigation techniques, knowledgeable about relevant laws and policies, and skilled in interviewing and documentation. Consider using an external investigator for senior-level complaints or complex situations.' },
      { heading: 'Conducting Interviews', content: 'Interview the complainant first, then the respondent, followed by witnesses. Explain the purpose and process, take detailed notes, avoid leading questions or showing bias, and remind participants about confidentiality.' },
      { heading: 'Gathering Evidence', content: 'Collect and review all relevant evidence including:', bullets: ['Emails, text messages, and other communications', 'Security footage or access logs', 'Personnel files and performance records', 'Relevant policies and procedures', 'Previous complaints or incidents'] },
      { heading: 'Common Mistakes', content: 'Avoid these critical errors:', bullets: ['Delayed response — allowing evidence to disappear and memories to fade', 'Predetermined conclusions — approaching with preconceived notions', 'Poor documentation — inadequate notes make findings hard to defend', 'Ignoring retaliation — failing to monitor for retaliation against complainants'] },
      { heading: 'After the Investigation', content: 'Communicate outcomes to complainant and respondent appropriately, implement corrective action if violations are found, follow up to ensure no retaliation, review policies and training needs, and retain the investigation file securely.' },
    ],
    cta: 'PreciseHR provides experienced, impartial workplace investigators to handle sensitive matters professionally.',
  },
  {
    id: 'performance-management',
    title: 'Building an Effective Performance Management System',
    excerpt: 'Transform your performance reviews from dreaded annual events to powerful tools for growth. Practical strategies for continuous feedback and development.',
    category: 'Performance',
    date: 'February 5, 2024',
    readTime: '7 min read',
    author: 'Jeffrey T. Furtado',
    authorRole: 'HR Consultant & Performance Expert',
    sections: [
      { heading: 'The Problem with Traditional Reviews', content: 'Annual performance reviews are often dreaded by managers and employees alike. They suffer from recency bias, infrequent feedback, arbitrary ratings, backward-looking focus, and administrative burden. There\'s a better way.' },
      { heading: 'Continuous Performance Management', content: 'Modern performance management emphasizes ongoing conversations, real-time feedback, and development focus. Here\'s how to build an effective system.' },
      { heading: '1. Set Clear Expectations', content: 'Performance starts with clarity. Employees need to understand what success looks like, how their work connects to organizational goals, specific measurable objectives, and behavioral expectations and values.' },
      { heading: '2. Regular Check-ins', content: 'Don\'t wait for the annual review. Implement weekly or biweekly one-on-ones, monthly goal progress reviews, quarterly performance conversations, and real-time feedback for both positive and constructive situations.' },
      { heading: '3. Focus on Development', content: 'Shift from evaluation to growth: identify strengths to leverage, discuss development areas without blame, create individual development plans, and provide learning opportunities and resources.' },
      { heading: '4. Document Continuously', content: 'Keep running records of achievements and contributions, challenges and how they were addressed, development activities completed, and feedback given and received.' },
      { heading: 'The Annual Review Becomes a Summary', content: 'With continuous management in place, the annual review becomes a summary of ongoing conversations — not a revelation. Use it to reflect on accomplishments, discuss compensation and advancement, set objectives for the coming year, and align on long-term career development.' },
      { heading: 'Train Your Managers', content: 'Your system is only as good as your managers\' ability to use it. Provide training on giving effective feedback (specific, timely, balanced), conducting productive conversations, recognizing and addressing bias, and handling difficult conversations.' },
      { heading: 'Measuring Effectiveness', content: 'Track engagement survey scores, goal completion rates, turnover rates (especially high performers), manager and employee satisfaction with the process, and time to productivity for new hires.' },
    ],
    cta: 'Let PreciseHR help you design and implement a performance management system that drives results.',
  },
  {
    id: 'remote-work-policies',
    title: 'Remote Work Policies: What Canadian Employers Need to Know',
    excerpt: 'Create comprehensive remote work policies that balance flexibility with accountability. Address legal considerations, equipment, and performance expectations.',
    category: 'Policy',
    date: 'February 3, 2024',
    readTime: '6 min read',
    author: 'Jeffrey T. Furtado',
    authorRole: 'HR Consultant & Remote Work Specialist',
    sections: [
      { heading: 'The New Reality', content: 'Remote work has evolved from emergency response to permanent fixture. Canadian employers need comprehensive policies that address legal obligations, operational needs, and employee expectations.' },
      { heading: '1. Eligibility Criteria', content: 'Define which roles and employees are eligible:', bullets: ['Job requirements — can duties be performed remotely?', 'Performance standards — good standing required', 'Approval process and decision-makers', 'Trial periods and review timelines', 'Right to revoke remote work arrangements'] },
      { heading: '2. Work Schedule and Availability', content: 'Set clear expectations about when and how employees work:', bullets: ['Core hours when employees must be available', 'Flexibility parameters', 'Response time expectations for communications', 'Meeting attendance requirements', 'Time tracking and reporting procedures'] },
      { heading: '3. Equipment and Expenses', content: 'Clarify what the employer provides and employee responsibilities:', bullets: ['Company-provided equipment (laptop, monitor, phone)', 'Internet and phone reimbursement', 'Software and security requirements', 'Technical support availability', 'Equipment maintenance and return procedures'] },
      { heading: '4. Health and Safety', content: 'Employers still have health and safety obligations for remote workers. Address dedicated workspace requirements, ergonomic guidelines, right to inspect home workspace with notice, and workers\' compensation for home injuries.' },
      { heading: '5. Data Security', content: 'Protect sensitive information with VPN and secure connection requirements, password and authentication protocols, restrictions on public Wi-Fi use, document handling and storage rules, and clear consequences for security breaches.' },
      { heading: '6. Performance Management', content: 'Define how performance will be measured: output and deliverable expectations, communication standards, meeting participation requirements, regular check-in schedules, and consequences of performance issues.' },
      { heading: 'Multi-Jurisdictional Considerations', content: 'If employees work from different provinces, determine which employment standards apply, review workers\' compensation coverage, consider tax implications, and update payroll and benefits administration. Working from outside Canada adds immigration, tax, and data sovereignty complexity.' },
      { heading: 'Hybrid Arrangements', content: 'For mixed remote/office arrangements, establish required office days and flexibility, desk booking and workspace allocation, meeting scheduling considerations, and equity between remote and office workers.' },
    ],
    cta: 'PreciseHR can help you develop comprehensive remote work policies tailored to your organization.',
  },
  {
    id: 'preventing-workplace-harassment',
    title: 'Preventing Workplace Harassment: A Proactive Approach',
    excerpt: 'Go beyond compliance with strategies to create a truly respectful workplace. Training, policies, and cultural initiatives that make a difference.',
    category: 'Workplace Culture',
    date: 'February 1, 2024',
    readTime: '9 min read',
    author: 'Jeffrey T. Furtado',
    authorRole: 'HR Consultant & Workplace Culture Expert',
    sections: [
      { heading: 'Beyond Compliance', content: 'Compliance with Bill C-65 and provincial harassment legislation is just the starting point. Organizations with strong prevention programs experience lower turnover, higher engagement, better reputation, and reduced legal costs.' },
      { heading: 'The Legal Framework', content: 'Canadian employers must comply with federal and provincial human rights legislation, occupational health and safety acts, workplace harassment and violence prevention laws, and employment standards regarding workplace conduct.' },
      { heading: 'Building a Strong Policy', content: 'Your harassment policy should define harassment with clear examples, cover all protected grounds, include sexual harassment and violence, address power imbalances and third-party harassment, outline reporting procedures, and specify consequences for violations.' },
      { heading: 'Effective Training', content: 'Make training interactive with real scenarios relevant to your workplace. Create safe space for questions and discussion, track attendance and understanding, and refresh regularly — not just at onboarding.' },
      { heading: 'Creating Safe Reporting Channels', content: 'Remove barriers to reporting by offering multiple reporting options, anonymous reporting mechanisms, external third-party reporting for small organizations, and clear protection against retaliation.' },
      { heading: 'Responding to Complaints', content: 'When a complaint is received: acknowledge receipt immediately, assess urgency and safety concerns, implement interim measures if needed, conduct a thorough impartial investigation, and take appropriate corrective action.' },
      { heading: 'Building a Respectful Culture', content: 'Prevention goes beyond policies:', bullets: ['Senior leaders model respectful behavior', 'Zero tolerance messaging from leadership', 'Resources allocated to prevention efforts', 'Inclusive language and communications', 'Regular pulse surveys on workplace climate', 'Transparent reporting of complaint trends'] },
      { heading: 'Remote and Digital Harassment', content: 'Extend policies to digital communications, address video call etiquette and boundaries, monitor for online harassment and exclusion, provide virtual training options, and ensure remote workers can report safely.' },
      { heading: 'Third-Party Harassment', content: 'Protect employees from clients, customers, and vendors. Include third-party harassment in policies, empower employees to refuse service when harassed, and consider ending relationships with repeat offenders.' },
    ],
    cta: 'PreciseHR provides harassment prevention training, policy development, and culture assessments.',
  },
  {
    id: 'termination-best-practices',
    title: 'Termination Best Practices: Protecting Your Organization',
    excerpt: 'Handle terminations with professionalism and legal compliance. Documentation, severance considerations, and communication strategies that minimize risk.',
    category: 'Compliance',
    date: 'January 22, 2024',
    readTime: '10 min read',
    author: 'Jeffrey T. Furtado',
    authorRole: 'HR Consultant & Employment Law Specialist',
    sections: [
      { heading: 'Getting Termination Right', content: 'Termination is one of the highest-risk activities in HR. Done poorly, it exposes your organization to wrongful dismissal claims, human rights complaints, and reputational damage. Done well, it protects everyone involved.' },
      { heading: 'Legal Requirements', content: 'Canadian termination law varies by jurisdiction but generally requires:', bullets: ['Reasonable notice or pay in lieu of notice', 'Severance pay (where applicable)', 'Continuation of benefits during notice period', 'Written notice meeting minimum standards', 'Proper ROE filing with Service Canada'] },
      { heading: 'Just Cause vs Without Cause', content: 'Most terminations in Canada are without cause — meaning the employer is ending the relationship for business reasons, not employee misconduct. Just cause terminations require extensive documentation of progressive discipline and must meet a very high legal standard.' },
      { heading: 'Documentation', content: 'Maintain thorough documentation throughout the employment relationship:', bullets: ['Performance reviews and feedback records', 'Written warnings and improvement plans', 'Training records and support provided', 'Attendance and conduct records', 'Any relevant correspondence'] },
      { heading: 'Calculating Severance', content: 'Statutory minimums are just the floor. Common law reasonable notice considers length of service, age, position and seniority, availability of similar employment, and whether the employee was induced to join. A termination package below common law entitlements invites legal claims.' },
      { heading: 'The Termination Meeting', content: 'Plan carefully: choose a private location, have two company representatives present, keep the message brief and clear, present the termination letter and package, allow the employee to ask questions, and arrange for dignified departure.' },
      { heading: 'Communication', content: 'After the termination, communicate appropriately with the team — acknowledge the departure without sharing details, reassign responsibilities promptly, and address any concerns about job security.' },
      { heading: 'Common Pitfalls', content: 'Avoid these mistakes:', bullets: ['Terminating without legal review of the package', 'Using email or phone instead of in-person meetings', 'Failing to consider human rights implications', 'Not having a witness present', 'Allowing the employee to return unsupervised', 'Making promises you can\'t keep about references'] },
      { heading: 'After the Termination', content: 'Ensure IT access is promptly revoked, company property is returned, final pay and benefits are processed correctly, ROE is filed within five days, and the personnel file is updated and securely stored.' },
    ],
    cta: 'PreciseHR provides end-to-end termination support, from planning to execution, ensuring legal compliance and professionalism.',
  },
];

export function getPostById(id: string): BlogPost | undefined {
  return blogPosts.find((p) => p.id === id);
}
