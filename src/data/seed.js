export const CATEGORIES = [
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    description: 'Deep learning, LLMs, computer vision, and AI research',
    icon: '🤖',
    color: 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20',
    threadCount: 2
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & DevOps',
    description: 'AWS, Azure, GCP, containers, CI/CD, and infrastructure',
    icon: '☁️',
    color: 'bg-sky-500/10 text-sky-300 border border-sky-500/20',
    threadCount: 1
  },
  {
    id: 'quantum-computing',
    name: 'Quantum Computing',
    description: 'Qubits, quantum algorithms, and next-gen computation',
    icon: '⚛️',
    color: 'bg-violet-500/10 text-violet-300 border border-violet-500/20',
    threadCount: 1
  },
  {
    id: 'systems-programming',
    name: 'Systems Programming',
    description: 'C++, Rust, OS, compilers, low-level engineering',
    icon: '🖥️',
    color: 'bg-gray-500/10 text-gray-300 border border-gray-500/20',
    threadCount: 1
  }
];

export const USERS = [
  { id: 'u1', name: 'Tyrion Lannister', avatar: 'TL', bio: 'Systems architect & distributed systems thinker' },
  { id: 'u2', name: 'Tony Stark', avatar: 'TS', bio: 'Engineer. Builder. Occasional over-optimizer.' },
  { id: 'u3', name: 'Peter Parker', avatar: 'PP', bio: 'AI researcher navigating production chaos' },
  { id: 'u4', name: 'Arya Stark', avatar: 'AS', bio: 'Full-stack & DevOps engineer' },
  { id: 'u5', name: 'Stephen Strange', avatar: 'SS', bio: 'Quantum computing specialist' },
  { id: 'currentUser', name: 'You', avatar: 'YO', bio: "That's you!" },
];

export const THREADS = [
 {
  id: 't1',
  categoryId: 'ai-ml',
  title: "Autonomous Systems and the Illusion of Human Oversight",
  body: `We keep saying humans are “in the loop.”

In reality, the loop is shrinking.

Recommendation engines shape perception.
LLMs draft policy proposals.
Autonomous agents execute trades faster than any compliance team can react.

Oversight is becoming symbolic — a checkbox rather than a constraint.

The real question is not whether autonomous systems make mistakes.

It is whether we still understand the systems we deploy at scale.

At what point does complexity exceed governance?

And if we cannot meaningfully intervene, are we still in control — or merely supervising inevitability?`,
  authorId: 'u2',
  createdAt: '2024-12-10T09:00:00Z',
  views: 417,
  isRead: false,
  isPinned: true,
  tags: ['ai-systems', 'governance', 'autonomy'],
},
  {
    id: 't2',
    categoryId: 'ai-ml',
    title: "LLMs in production: what actually breaks first?",
    body: `Building a demo is easy. Deploying at scale is not.

Token limits. Latency spikes. Hallucination mitigation. Vector DB scaling.

From real-world experience — what fails first when moving from prototype to production AI?`,
    authorId: 'u3',
    createdAt: '2024-12-08T14:30:00Z',
    views: 218,
    isRead: true,
    isPinned: false,
    tags: ['llm', 'production', 'rag'],
  },
  {
    id: 't3',
    categoryId: 'quantum-computing',
    title: 'Quantum computing in 2024: reality vs hype',
    body: `Breakthrough headlines are constant.

But error correction remains unsolved at meaningful scale. Coherence time is brutal.

Are we five years away — or twenty?`,
    authorId: 'u5',
    createdAt: '2024-12-07T11:15:00Z',
    views: 189,
    isRead: false,
    isPinned: false,
    tags: ['quantum', 'hardware'],
  },
  {
    id: 't4',
    categoryId: 'cloud-devops',
    title: 'Kubernetes at scale: when does it become overkill?',
    body: `Kubernetes is powerful — but often prematurely adopted.

At what scale does K8s genuinely become necessary?

Is Docker + CI/CD enough for most early-stage startups?`,
    authorId: 'u2',
    createdAt: '2024-12-05T08:45:00Z',
    views: 445,
    isRead: true,
    isPinned: false,
    tags: ['kubernetes', 'devops', 'infrastructure'],
  },
  {
    id: 't5',
    categoryId: 'ai-ml',
    title: 'Fine-tuning vs RAG: what actually scales long term?',
    body: `Fine-tuning offers control. RAG offers flexibility.

But cost, maintenance, and latency differ drastically.

In production systems, which approach survives long-term scaling?`,
    authorId: 'u1',
    createdAt: '2024-12-03T16:00:00Z',
    views: 156,
    isRead: false,
    isPinned: false,
    tags: ['llm', 'rag', 'finetuning'],
  },
];

export const POSTS = [
  {
    id: 'p1',
    threadId: 't1',
    parentId: null,
    authorId: 'u2',
    body: `CRDTs are elegant in theory, painful in implementation. Most teams don't have the distributed systems depth required.`,
    createdAt: '2024-12-10T10:15:00Z',
    votes: 34,
    userVote: null,
    isRead: true,
    depth: 0
  },
  {
    id: 'p2',
    threadId: 't2',
    parentId: null,
    authorId: 'u4',
    body: `Latency kills production AI faster than hallucinations. Users tolerate wrong answers more than slow answers.`,
    createdAt: '2024-12-08T15:00:00Z',
    votes: 21,
    userVote: 1,
    isRead: true,
    depth: 0
  },
  {
    id: 'p3',
    threadId: 't3',
    parentId: null,
    authorId: 'u5',
    body: `Materials science and cryptographic research are realistic early wins. General-purpose quantum computing is decades away.`,
    createdAt: '2024-12-07T12:30:00Z',
    votes: 18,
    userVote: null,
    isRead: true,
    depth: 0
  },
  {
    id: 'p4',
    threadId: 't4',
    parentId: null,
    authorId: 'u3',
    body: `Most startups adopt Kubernetes before they understand their scaling bottlenecks. Infrastructure maturity matters.`,
    createdAt: '2024-12-05T09:30:00Z',
    votes: 27,
    userVote: null,
    isRead: false,
    depth: 0
  }
];