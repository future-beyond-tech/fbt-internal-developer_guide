// FBT Backend Development Master Reference - Complete Typed Data Export

export interface NavSection {
  label: string;
  items: { id?: string; title?: string; label?: string; href?: string }[];
}

export interface Principle {
  acronym?: string;
  fullName?: string;
  name?: string;
  what?: string;
  why?: string;
  when?: string;
  description?: string;
  example?: string;
  benefits?: string[];
}

export interface Card {
  icon?: string;
  title: string;
  subtitle?: string;
  description: string;
  accent?: 'purple' | 'cyan' | 'amber' | 'green' | 'red' | 'sky' | 'pink';
  pills?: { label: string; variant: string }[];
  meta?: { label: string; value: string }[];
  code?: string;
  lang?: string;
  details?: string;
  variant?: string;
  items?: string[];
  [key: string]: unknown;
}

export interface PatternRow {
  name: string;
  family: string;
  description: string;
  when: string;
}

export interface PatternGroup {
  icon: string;
  title: string;
  color: string;
  subtitle: string;
  patterns: PatternRow[];
}

export interface Section {
  id: string;
  icon?: string;
  iconBg?: string;
  title: string;
  count?: string;
  description?: string;
  type?: string;
  cards?: Card[];
  principles?: Principle[];
  patternGroups?: PatternGroup[];
  flowSteps?: { title: string; description: string }[];
  codeExample?: { code: string; lang: string };
  callout?: { type: string; icon: string; text: string };
  hasFilter?: boolean;
  filterOptions?: string[];
  code?: string;
  lang?: string;
  table?: { headers: string[]; rows: string[][] };
  [key: string]: unknown;
}

export const backendNav: NavSection[] = [
  {
    label: 'Foundations',
    items: [
      { id: 'principles', title: 'Design Principles' },
      { id: 'standards', title: 'Coding Standards' },
      { id: 'paradigms', title: 'Paradigms' },
    ],
  },
  {
    label: 'Architecture',
    items: [
      { id: 'arch-patterns', title: 'Architectural Patterns' },
      { id: 'design-patterns', title: 'Design Patterns' },
      { id: 'enterprise-patterns', title: 'Enterprise Patterns' },
    ],
  },
  {
    label: 'Data Layer',
    items: [
      { id: 'data-handling', title: 'Data Handling' },
      { id: 'cqrs-es', title: 'CQRS & Event Sourcing' },
      { id: 'db-patterns', title: 'Database Patterns' },
    ],
  },
  {
    label: 'APIs & Comms',
    items: [
      { id: 'api-patterns', title: 'API Patterns' },
      { id: 'messaging', title: 'Messaging & Events' },
    ],
  },
  {
    label: 'Concurrency',
    items: [
      { id: 'concurrency', title: 'Concurrency' },
    ],
  },
  {
    label: 'Quality',
    items: [
      { id: 'testing', title: 'Testing' },
      { id: 'error-handling', title: 'Error Handling' },
      { id: 'security', title: 'Security' },
    ],
  },
  {
    label: 'Ops',
    items: [
      { id: 'observability', title: 'Observability' },
      { id: 'performance', title: 'Performance' },
      { id: 'deployment', title: 'Deployment' },
    ],
  },
  {
    label: 'Language-Specific',
    items: [
      { id: 'dotnet', title: '.NET/C# Specific' },
      { id: 'python', title: 'Python Specific' },
      { id: 'rust', title: 'Rust Specific' },
    ],
  },
];

export interface HeroData {
  title: string;
  subtitle?: string;
  description: string;
  stats: { value: string; label: string }[];
  tags?: string[];
}

export const backendHero: HeroData = {
  title: 'BACKEND DEVELOPMENT',
  subtitle: 'COMPLETE REFERENCE',
  description: 'Every principle, pattern, standard, and approach you need to build production-grade backend systems in .NET, Python, and Rust — structured, searchable, and FBT-grade.',
  stats: [
    { value: '21', label: 'SECTIONS' },
    { value: '80+', label: 'PATTERNS' },
    { value: '3', label: 'LANGUAGES' },
    { value: '∞', label: 'POSSIBILITIES' },
  ],
  tags: ['.NET', 'Python', 'Rust', 'Clean Architecture', 'CQRS', 'DDD', 'Microservices', 'Event-Driven'],
};

export const backendSections: Section[] = [
  {
    id: 'principles',
    icon: '⚡',
    iconBg: 'bg-purple-50',
    title: 'Design Principles',
    count: '14',
    type: 'table',
    principles: [
      {
        acronym: 'S',
        fullName: 'Single Responsibility Principle',
        what: 'A class should have only one reason to change. Each module should be responsible for a single user, actor, or role.',
        why: 'Improves maintainability, testability, and modularity. Reduces coupling and makes code changes less risky.',
        when: 'When designing class responsibilities and determining where to place business logic.',
      },
      {
        acronym: 'O',
        fullName: 'Open/Closed Principle',
        what: 'Software entities should be open for extension but closed for modification. Add new behavior through extension, not by changing existing code.',
        why: 'Reduces risk of breaking existing functionality when adding new features. Encourages flexible design.',
        when: 'When you need to add new features without touching stable code. Use interfaces and inheritance.',
      },
      {
        acronym: 'L',
        fullName: 'Liskov Substitution Principle',
        what: 'Derived classes must be substitutable for their base classes without breaking the contract. Objects of derived classes should work seamlessly where base class objects are expected.',
        why: 'Ensures type safety and prevents unexpected runtime errors. Enables polymorphism to work correctly.',
        when: 'When designing inheritance hierarchies and interface implementations. Check that subtypes honor parent contracts.',
      },
      {
        acronym: 'I',
        fullName: 'Interface Segregation Principle',
        what: 'Clients should not be forced to depend on interfaces they do not use. Prefer many small, specific interfaces over large, general ones.',
        why: 'Reduces coupling between components. Clients only depend on what they actually need.',
        when: 'When defining interfaces and abstract contracts. Split large interfaces into smaller, focused ones.',
      },
      {
        acronym: 'D',
        fullName: 'Dependency Inversion Principle',
        what: 'High-level modules should not depend on low-level modules; both should depend on abstractions. Depend on abstractions, not concrete implementations.',
        why: 'Decouples layers and components. Makes testing easier through mocking and dependency injection.',
        when: 'When organizing application architecture. Use DI containers to manage dependencies.',
      },
      {
        acronym: 'DRY',
        fullName: 'Don\'t Repeat Yourself',
        what: 'Every piece of knowledge should have a single, unambiguous representation in the system. Avoid duplicating logic, data, or intent.',
        why: 'Reduces bugs by centralizing logic. Changes only need to happen in one place. Improves maintainability.',
        when: 'When writing code, refactor duplication into reusable functions, classes, or utilities.',
      },
      {
        acronym: 'KISS',
        fullName: 'Keep It Simple, Stupid',
        what: 'Design and implement using the simplest approach that solves the problem. Avoid unnecessary complexity, abstraction, or sophistication.',
        why: 'Simpler code is easier to understand, debug, and maintain. Reduces cognitive load.',
        when: 'During design and implementation. Choose straightforward solutions before considering complex alternatives.',
      },
      {
        acronym: 'YAGNI',
        fullName: 'You Aren\'t Gonna Need It',
        what: 'Do not add functionality until it is explicitly required. Avoid speculative development of features "just in case."',
        why: 'Reduces code bloat and maintenance burden. Keeps the codebase lean and focused.',
        when: 'When tempted to add "future-proofing" features. Build only what is needed now.',
      },
      {
        acronym: 'SoC',
        fullName: 'Separation of Concerns',
        what: 'Divide the program into distinct sections, each handling a specific concern or responsibility. Different parts should manage different aspects (UI, business logic, data access).',
        why: 'Improves modularity, testability, and reusability. Makes code easier to understand and modify.',
        when: 'In overall application architecture. Separate presentation, business logic, and data persistence layers.',
      },
      {
        acronym: 'LoD',
        fullName: 'Law of Demeter',
        what: 'An object should only communicate with its direct dependencies, not with the dependencies of its dependencies. Avoid chained method calls like obj.a().b().c().',
        why: 'Reduces coupling and brittleness. Changes to intermediate objects don\'t break callers.',
        when: 'When designing object interactions and method interfaces. Keep call chains shallow.',
      },
      {
        acronym: 'CQS',
        fullName: 'Command Query Separation',
        what: 'Methods should either perform an action (Command) or return data (Query), not both. Separate methods that modify state from those that retrieve state.',
        why: 'Improves clarity and predictability. Easier to reason about side effects. Enables better caching and optimization.',
        when: 'When designing public interfaces and APIs. Use distinct methods for reading and writing.',
      },
      {
        acronym: 'CoC',
        fullName: 'Convention over Configuration',
        what: 'Provide sensible defaults and follow established conventions rather than requiring explicit configuration for common scenarios.',
        why: 'Reduces boilerplate and setup time. Makes projects more consistent and easier to navigate.',
        when: 'When designing frameworks and libraries. Establish conventions that developers can rely on.',
      },
      {
        acronym: 'PIE',
        fullName: 'Program to Interfaces, not Implementations',
        what: 'Code against abstract interfaces rather than concrete implementations. This enables loose coupling and polymorphism.',
        why: 'Makes code more flexible and testable. Allows swapping implementations without changing client code.',
        when: 'When designing dependencies and contracts. Use interfaces for external dependencies.',
      },
      {
        acronym: 'PoLA',
        fullName: 'Principle of Least Astonishment',
        what: 'Design systems so they behave as users expect. Avoid surprising behavior or unintuitive naming. Be consistent with similar components.',
        why: 'Reduces cognitive load and errors. Makes code more predictable and easier to use.',
        when: 'When designing APIs, naming conventions, and behavior. Consider developer expectations.',
      },
    ],
  },
  {
    id: 'standards',
    icon: '📝',
    iconBg: 'bg-cyan-50',
    title: 'Coding Standards',
    count: '6',
    type: 'cards',
    hasFilter: true,
    filterOptions: ['.NET', 'Python', 'Rust', 'All'],
    cards: [
      {
        icon: '#',
        title: 'C# Naming Conventions',
        description: 'Follow PascalCase for public members and camelCase for private fields. Use clear, descriptive names that express intent.',
        accent: 'purple',
        pills: [{ label: '.NET', variant: 'dotnet' }],
        code: 'public class OrderProcessor\n{\n  private List<Order> _orders; // camelCase\n  public void ProcessOrder(Order order) { } // PascalCase\n  private bool ValidatePayment(Payment payment) { }\n}',
        lang: 'csharp',
      },
      {
        icon: '🐍',
        title: 'Python PEP 8 Style',
        description: 'Use snake_case for variables and functions, UPPER_CASE for constants. 4-space indentation. Max line length 79 chars (PEP 8) or 88 (Black).',
        accent: 'cyan',
        pills: [{ label: 'Python', variant: 'python' }],
        code: 'def process_order(order: Order) -> bool:\n    TIMEOUT_SECONDS = 30\n    valid_items = validate_items(order.items)\n    return valid_items and order.total > 0',
        lang: 'python',
      },
      {
        icon: '🦀',
        title: 'Rust Naming Conventions',
        description: 'Use snake_case for variables, functions, and modules. PascalCase for types and constants. Follow Rust API guidelines for clarity.',
        accent: 'amber',
        pills: [{ label: 'Rust', variant: 'rust' }],
        code: 'pub struct OrderProcessor {\n    active_orders: Vec<Order>,\n}\n\npub fn process_order(order: Order) -> Result<(), Error> {\n    let ORDER_LIMIT = 1000;\n    Ok(())\n}',
        lang: 'rust',
      },
      {
        icon: '📦',
        title: 'C# File Structure & Organization',
        description: 'One public class per file. Organize members: public methods, properties, private methods. Use namespaces to organize by feature or domain.',
        accent: 'green',
        pills: [{ label: '.NET', variant: 'dotnet' }],
        code: 'namespace Domain.Orders\n{\n  public class Order\n  {\n    public int Id { get; set; }\n    public List<OrderItem> Items { get; set; }\n    \n    public decimal GetTotal() => Items.Sum(i => i.Price);\n    private void ValidateItems() { }\n  }\n}',
        lang: 'csharp',
      },
      {
        icon: '📂',
        title: 'Python Project Layout',
        description: 'Standard structure: src/package_name for code, tests/ for tests, setup.py/pyproject.toml for config. Use __init__.py for packages.',
        accent: 'red',
        pills: [{ label: 'Python', variant: 'python' }],
        code: 'project/\n├── src/myapp/\n│   ├── __init__.py\n│   ├── models.py\n│   └── services.py\n├── tests/\n│   └── test_models.py\n├── pyproject.toml\n└── README.md',
        lang: 'text',
      },
      {
        icon: '🔧',
        title: 'Rust Workspace Organization',
        description: 'Use workspaces for multi-crate projects. Separate library crates from binary crates. Clear module hierarchy with mod.rs.',
        accent: 'sky',
        pills: [{ label: 'Rust', variant: 'rust' }],
        code: '[workspace]\nmembers = ["crates/api", "crates/domain"]\n\n// src/lib.rs\npub mod domain;\npub mod services;\n\n// domain/mod.rs\npub struct Order { }\npub mod validators;',
        lang: 'toml',
      },
    ],
  },
  {
    id: 'paradigms',
    icon: '🎯',
    iconBg: 'bg-amber-50',
    title: 'Paradigms',
    count: '6',
    type: 'cards',
    cards: [
      {
        icon: '🏗️',
        title: 'Object-Oriented Programming',
        description: 'Organize code around objects with state and behavior. Emphasizes encapsulation, inheritance, and polymorphism. Natural for modeling real-world entities.',
        accent: 'purple',
        pills: [{ label: 'all', variant: 'all' }],
      },
      {
        icon: 'λ',
        title: 'Functional Programming',
        description: 'Treat computation as the evaluation of pure functions. Emphasizes immutability, higher-order functions, and avoiding side effects. Easier reasoning and testing.',
        accent: 'cyan',
        pills: [{ label: 'all', variant: 'all' }],
      },
      {
        icon: '⚛️',
        title: 'Reactive Programming',
        description: 'Build responsive systems using observable streams and event-driven architecture. Components react to data changes. Good for handling async operations.',
        accent: 'green',
        pills: [{ label: 'all', variant: 'all' }],
      },
      {
        icon: '📋',
        title: 'Procedural Programming',
        description: 'Organize code as a sequence of procedures/functions that modify state. Direct control flow. Good for straightforward, step-by-step logic.',
        accent: 'amber',
        pills: [{ label: 'all', variant: 'all' }],
      },
      {
        icon: '📐',
        title: 'Declarative Programming',
        description: 'Specify what you want rather than how to achieve it. Let the system figure out the steps. Examples: SQL, configuration-based systems.',
        accent: 'red',
        pills: [{ label: 'all', variant: 'all' }],
      },
      {
        icon: '👤',
        title: 'Actor Model',
        description: 'Concurrent systems based on independent actors communicating via messages. Avoids shared state and race conditions. Excellent for distributed systems.',
        accent: 'pink',
        pills: [{ label: 'all', variant: 'all' }],
      },
    ],
  },
  {
    id: 'arch-patterns',
    icon: '🏛️',
    iconBg: 'bg-green-50',
    title: 'Architectural Patterns',
    count: '8',
    type: 'cards',
    cards: [
      {
        icon: '🎯',
        title: 'Clean Architecture',
        description: 'Concentric layers separating concerns: Entities, Use Cases, Interface Adapters, Frameworks. Dependencies point inward. Highly testable and decoupled.',
        accent: 'purple',
        meta: [{ label: 'Layers', value: '4' }],
      },
      {
        icon: '🔷',
        title: 'Hexagonal Architecture',
        description: 'Ports and Adapters. Core business logic at center with external dependencies as adapters. Enables multiple entry/exit points without changing core logic.',
        accent: 'cyan',
        meta: [{ label: 'Synonyms', value: 'Ports & Adapters' }],
      },
      {
        icon: '🔗',
        title: 'Microservices',
        description: 'Independently deployable services built around business capabilities. Each service has its own database. Scaled and developed independently. Increased complexity.',
        accent: 'amber',
        meta: [{ label: 'Communication', value: 'Async/REST/gRPC' }],
      },
      {
        icon: '📦',
        title: 'Modular Monolith',
        description: 'Single deployment unit with clear module boundaries. Modules communicate through well-defined interfaces. Balances simplicity of monolith with organization of microservices.',
        accent: 'green',
        meta: [{ label: 'Complexity', value: 'Medium' }],
      },
      {
        icon: '🏘️',
        title: 'Domain-Driven Design',
        description: 'Align software structure with business domain. Use ubiquitous language shared between developers and domain experts. Organize around bounded contexts.',
        accent: 'red',
        meta: [{ label: 'Focus', value: 'Business Value' }],
      },
      {
        icon: '⚡',
        title: 'Event-Driven Architecture',
        description: 'Components communicate through events. Decoupled producers and consumers. Excellent for real-time systems and maintaining eventual consistency across services.',
        accent: 'sky',
        meta: [{ label: 'Pattern', value: 'Pub/Sub' }],
      },
      {
        icon: '🌐',
        title: 'Service-Oriented Architecture',
        description: 'Business capabilities exposed as reusable services. Heavy use of messaging and protocols. Enterprise-level approach, often with ESB and SOAP.',
        accent: 'pink',
        meta: [{ label: 'Protocol', value: 'SOAP/REST' }],
      },
      {
        icon: '☁️',
        title: 'Serverless Architecture',
        description: 'Run code without managing servers. Scale automatically. Pay per execution. Good for event-driven workloads and variable traffic patterns.',
        accent: 'purple',
        meta: [{ label: 'Scaling', value: 'Automatic' }],
      },
    ],
  },
  {
    id: 'design-patterns',
    icon: '🎨',
    iconBg: 'bg-red-50',
    title: 'Design Patterns',
    count: '22',
    type: 'patterns',
    patternGroups: [
      {
        icon: '🔨',
        title: 'Creational Patterns',
        color: 'bg-purple-100',
        subtitle: 'Object creation mechanisms',
        patterns: [
          {
            name: 'Singleton',
            family: 'Creational',
            description: 'Ensure a class has only one instance and provide a global point of access to it. Use for loggers, configuration managers, connection pools.',
            when: 'When you need exactly one instance shared globally. Be careful of threading issues.',
          },
          {
            name: 'Factory Method',
            family: 'Creational',
            description: 'Define an interface for creating objects, letting subclasses decide which class to instantiate. Reduces coupling to concrete classes.',
            when: 'When object creation logic is complex or depends on runtime conditions.',
          },
          {
            name: 'Abstract Factory',
            family: 'Creational',
            description: 'Provide an interface for creating families of related objects. Ensures consistency across a set of related products.',
            when: 'When you need to create related object families (e.g., UI elements for different themes).',
          },
          {
            name: 'Builder',
            family: 'Creational',
            description: 'Separate construction of complex objects from their representation. Build objects step by step. Improves readability for objects with many parameters.',
            when: 'When constructing complex objects with many optional parameters or validation requirements.',
          },
          {
            name: 'Prototype',
            family: 'Creational',
            description: 'Specify kinds of objects to create using a prototype instance, cloning it rather than creating from scratch. Efficient for expensive object creation.',
            when: 'When object creation is expensive or when you need deep copies.',
          },
          {
            name: 'Object Pool',
            family: 'Creational',
            description: 'Reuse objects that are expensive to create by pooling them. Acquire from pool, use, return. Reduces allocation overhead.',
            when: 'When object creation is expensive and instances are used briefly then released.',
          },
        ],
      },
      {
        icon: '🏗️',
        title: 'Structural Patterns',
        color: 'bg-cyan-100',
        subtitle: 'Object composition and relationships',
        patterns: [
          {
            name: 'Adapter',
            family: 'Structural',
            description: 'Convert the interface of a class into another interface clients expect. Bridge incompatible interfaces. Also called Wrapper.',
            when: 'When integrating third-party libraries or legacy code with incompatible interfaces.',
          },
          {
            name: 'Decorator',
            family: 'Structural',
            description: 'Attach additional responsibilities to an object dynamically, extending functionality without modifying the object. Flexible alternative to subclassing.',
            when: 'When you need to add behavior to individual objects without affecting others or creating new subclasses.',
          },
          {
            name: 'Proxy',
            family: 'Structural',
            description: 'Provide a surrogate or placeholder for another object to control access to it. Can add lazy loading, logging, or access control.',
            when: 'When you need to control access, defer creation, or add cross-cutting concerns.',
          },
          {
            name: 'Facade',
            family: 'Structural',
            description: 'Provide a unified, simplified interface to a set of interfaces in a subsystem. Hides complexity and reduces coupling.',
            when: 'When you want to simplify complex subsystems or provide a simpler API.',
          },
          {
            name: 'Composite',
            family: 'Structural',
            description: 'Compose objects into tree structures representing part-whole hierarchies. Clients treat individual objects and compositions uniformly.',
            when: 'When building tree structures (e.g., menu systems, document hierarchies).',
          },
          {
            name: 'Bridge',
            family: 'Structural',
            description: 'Decouple an abstraction from its implementation so they can vary independently. Avoid cartesian product of abstractions × implementations.',
            when: 'When you have multiple dimensions of variation and want to avoid explosion of subclasses.',
          },
        ],
      },
      {
        icon: '⚙️',
        title: 'Behavioral Patterns',
        color: 'bg-amber-100',
        subtitle: 'Object collaboration and responsibility distribution',
        patterns: [
          {
            name: 'Strategy',
            family: 'Behavioral',
            description: 'Define a family of algorithms, encapsulate each one, and make them interchangeable. Clients can select strategies at runtime.',
            when: 'When you have multiple algorithms for a task and need to switch between them.',
          },
          {
            name: 'Observer',
            family: 'Behavioral',
            description: 'Define a one-to-many dependency so when one object changes state, all dependents are notified automatically. Implements publish-subscribe.',
            when: 'When you need loose coupling between components that must react to state changes.',
          },
          {
            name: 'Command',
            family: 'Behavioral',
            description: 'Encapsulate a request as an object, allowing you to parameterize clients with different requests, queue requests, and log/undo operations.',
            when: 'When you need undo/redo, queuing, or command logging.',
          },
          {
            name: 'Chain of Responsibility',
            family: 'Behavioral',
            description: 'Avoid coupling the sender of a request to its receiver by giving multiple objects a chance to handle it. Pass request along a chain.',
            when: 'When processing logic depends on runtime conditions or should be extensible.',
          },
          {
            name: 'Mediator',
            family: 'Behavioral',
            description: 'Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly.',
            when: 'When multiple objects need to communicate in complex ways and you want to centralize that logic.',
          },
          {
            name: 'State',
            family: 'Behavioral',
            description: 'Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.',
            when: 'When an object\'s behavior depends on state and you have many conditional branches.',
          },
          {
            name: 'Template Method',
            family: 'Behavioral',
            description: 'Define the skeleton of an algorithm in a base class, letting subclasses fill in specific steps. Inverts control of algorithm steps.',
            when: 'When you have an algorithm with varying implementations of certain steps.',
          },
          {
            name: 'Visitor',
            family: 'Behavioral',
            description: 'Represent an operation to be performed on elements of an object structure. Lets you define new operations without changing the classes of those elements.',
            when: 'When you need to perform operations on complex object structures and operations change frequently.',
          },
          {
            name: 'Iterator',
            family: 'Behavioral',
            description: 'Provide a way to access elements of a collection sequentially without exposing its underlying representation.',
            when: 'When you need to traverse collections in various ways without exposing their internal structure.',
          },
          {
            name: 'Memento',
            family: 'Behavioral',
            description: 'Capture and externalize an object\'s internal state without violating encapsulation, and restore the object to this state later.',
            when: 'When you need to implement undo functionality or save/restore object state.',
          },
        ],
      },
    ],
  },
  {
    id: 'enterprise-patterns',
    icon: '🏢',
    iconBg: 'bg-sky-50',
    title: 'Enterprise Patterns',
    count: '6',
    type: 'cards',
    cards: [
      {
        icon: '📦',
        title: 'Repository Pattern',
        description: 'Abstract data access logic behind a repository interface. Clients interact with repositories instead of directly accessing data. Enables switching persistence mechanisms.',
        accent: 'purple',
        code: 'public interface IOrderRepository {\n  Task<Order> GetByIdAsync(int id);\n  Task<List<Order>> GetAllAsync();\n  Task SaveAsync(Order order);\n}\n\npublic class OrderRepository : IOrderRepository {\n  private readonly DbContext _db;\n  public Task<Order> GetByIdAsync(int id) => _db.Orders.FindAsync(id);\n}',
        lang: 'csharp',
      },
      {
        icon: '🔄',
        title: 'Unit of Work Pattern',
        description: 'Maintain a collection of objects affected by a business transaction and coordinates writing changes and handling concurrency. Ensures all changes are atomic.',
        accent: 'cyan',
        code: 'public interface IUnitOfWork {\n  IOrderRepository Orders { get; }\n  ICustomerRepository Customers { get; }\n  Task<int> SaveChangesAsync();\n}\n\nvar order = await _uow.Orders.GetByIdAsync(1);\norder.Status = OrderStatus.Shipped;\nawait _uow.SaveChangesAsync();',
        lang: 'csharp',
      },
      {
        icon: '🎯',
        title: 'Specification Pattern',
        description: 'Encapsulate query logic in reusable specification objects. Separate complex filtering rules from repositories. Makes queries composable and testable.',
        accent: 'amber',
        code: 'public class ActiveOrdersSpec : Specification<Order> {\n  public ActiveOrdersSpec() {\n    AddCriteria(o => o.Status == OrderStatus.Active);\n    AddInclude(o => o.Items);\n  }\n}\n\nvar orders = await repo.GetAsync(new ActiveOrdersSpec());',
        lang: 'csharp',
      },
      {
        icon: '⚔️',
        title: 'Anti-Corruption Layer',
        description: 'Create a layer that translates between external system contracts and your domain model. Isolates domain from changes in external systems.',
        accent: 'green',
        code: 'public class LegacyOrderAdapter {\n  public Order AdaptFromLegacy(LegacyOrderDto dto) {\n    return new Order {\n      Id = dto.OrderId,\n      Status = MapLegacyStatus(dto.Status),\n      Items = dto.Items.Select(AdaptItem).ToList()\n    };\n  }\n}',
        lang: 'csharp',
      },
      {
        icon: '📊',
        title: 'Read Models',
        description: 'Maintain denormalized, query-optimized views of data separate from write models. Each read model is optimized for specific queries. Common in CQRS.',
        accent: 'red',
        meta: [{ label: 'Pattern', value: 'CQRS' }],
      },
      {
        icon: '⏰',
        title: 'Sagas & Process Managers',
        description: 'Coordinate long-running, distributed transactions across multiple services. Sagas are event-driven; Process Managers route messages. Handle compensating transactions for failures.',
        accent: 'pink',
        meta: [{ label: 'Scope', value: 'Distributed' }],
      },
    ],
  },
  {
    id: 'data-handling',
    icon: '💾',
    iconBg: 'bg-purple-50',
    title: 'Data Handling',
    count: '6',
    type: 'cards',
    cards: [
      {
        icon: '🗄️',
        title: 'Object-Relational Mapping (ORM)',
        description: 'Map objects to database tables. Handle hydration and persistence automatically. Examples: Entity Framework, SQLAlchemy, SeaORM. Trade flexibility for convenience.',
        accent: 'purple',
        pills: [
          { label: 'Entity Framework', variant: 'dotnet' },
          { label: 'SQLAlchemy', variant: 'python' },
          { label: 'SeaORM', variant: 'rust' },
        ],
      },
      {
        icon: '⚡',
        title: 'Query Builders & Micro-ORMs',
        description: 'Write SQL with less boilerplate through fluent APIs. Dapper, Linq2Db (C#), SQLAlchemy Core (Python), sqlx (Rust). More control than ORMs, less verbose than raw SQL.',
        accent: 'cyan',
        pills: [
          { label: 'Dapper', variant: 'dotnet' },
          { label: 'sqlx', variant: 'rust' },
        ],
        code: 'var orders = await connection.QueryAsync<Order>(\n  "SELECT * FROM Orders WHERE CustomerId = @CustomerId",\n  new { CustomerId = 123 }\n);',
        lang: 'csharp',
      },
      {
        icon: '📜',
        title: 'Database Migrations',
        description: 'Version control your schema changes. Migrations are versioned scripts or code that evolve schema over time. Reversible and trackable. Examples: Flyway, EF Migrations, Alembic.',
        accent: 'amber',
        code: 'public class AddOrderTableMigration : Migration {\n  public override void Up() {\n    CreateTable("Orders")\n      .WithColumn("Id").AsInt32().PrimaryKey()\n      .WithColumn("CustomerId").AsInt32()\n      .WithColumn("Total").AsDecimal();\n  }\n}',
        lang: 'csharp',
      },
      {
        icon: '⚙️',
        title: 'Caching Strategies',
        description: 'Reduce database hits with in-memory or distributed caches. Cache-aside, write-through, write-behind patterns. Know cache invalidation strategies.',
        accent: 'green',
        meta: [{ label: 'Complexity', value: 'High' }],
      },
      {
        icon: '📊',
        title: 'Read Models',
        description: 'Denormalized views optimized for specific queries. Kept in sync with write model via events. Critical for read-heavy workloads and analytics.',
        accent: 'red',
      },
      {
        icon: '🔍',
        title: 'Search Indexing',
        description: 'Full-text search and analytics via Elasticsearch, Solr, or similar. Index documents for fast, flexible querying beyond SQL capabilities.',
        accent: 'sky',
        meta: [{ label: 'Tools', value: 'Elasticsearch, Meilisearch' }],
      },
    ],
  },
  {
    id: 'cqrs-es',
    icon: '📤',
    iconBg: 'bg-cyan-50',
    title: 'CQRS & Event Sourcing',
    count: '6',
    type: 'flow',
    cards: [
      {
        icon: '1️⃣',
        title: 'HTTP Request',
        description: 'Client sends a command or query to the API endpoint.',
        accent: 'purple',
      },
      {
        icon: '2️⃣',
        title: 'Controller/Handler',
        description: 'Receives request, validates input, routes to command/query handler.',
        accent: 'cyan',
      },
      {
        icon: '3️⃣',
        title: 'Pipeline/Middleware',
        description: 'Cross-cutting concerns: logging, validation, authorization, error handling.',
        accent: 'amber',
      },
      {
        icon: '4️⃣',
        title: 'Aggregate',
        description: 'Processes command, validates business rules, emits domain events. Single source of truth.',
        accent: 'green',
      },
      {
        icon: '5️⃣',
        title: 'Outbox/Event Store',
        description: 'Persists events transactionally. Ensures no loss. Published asynchronously via message broker.',
        accent: 'red',
      },
      {
        icon: '6️⃣',
        title: 'Projections',
        description: 'Subscribe to events, build denormalized read models for fast queries.',
        accent: 'pink',
      },
    ],
    callout: {
      type: 'purple',
      icon: '💡',
      text: 'Event Sourcing Example: Instead of storing final state, store sequence of events (OrderCreated, PaymentProcessed, OrderShipped). Rebuild state by replaying events.',
    },
    code: 'public class CreateOrderCommand {\n  public int CustomerId { get; set; }\n  public List<OrderItem> Items { get; set; }\n}\n\npublic class Order {\n  public void Create(int customerId, List<OrderItem> items) {\n    RaiseEvent(new OrderCreatedEvent { CustomerId = customerId, Items = items });\n  }\n  \n  private void OnOrderCreated(OrderCreatedEvent e) {\n    CustomerId = e.CustomerId;\n    Items = e.Items;\n    Status = OrderStatus.Pending;\n  }\n}',
    lang: 'csharp',
  },
  {
    id: 'db-patterns',
    icon: '🗄️',
    iconBg: 'bg-green-50',
    title: 'Database Patterns',
    count: '10',
    type: 'cards',
    cards: [
      {
        icon: '🔗',
        title: 'Database per Service',
        description: 'Each microservice owns its database schema. Enables independent scaling and schema evolution. Requires eventual consistency across services.',
        accent: 'purple',
        meta: [{ label: 'Scope', value: 'Microservices' }],
      },
      {
        icon: '📊',
        title: 'Shared Database',
        description: 'Multiple services share a database schema. Simpler to query across services but tight coupling. Hard to scale independently.',
        accent: 'cyan',
        meta: [{ label: 'Scope', value: 'Monolith' }],
      },
      {
        icon: '👥',
        title: 'Multi-Tenancy',
        description: 'Serve multiple tenants in a single database. Shared or separate schemas. Requires careful data isolation and querying. Cost-effective but complex.',
        accent: 'amber',
      },
      {
        icon: '🔄',
        title: 'Read Replicas',
        description: 'Replicate data to read-only copies for scaling read workloads. Asynchronous replication. Introduces eventual consistency window.',
        accent: 'green',
      },
      {
        icon: '🎯',
        title: 'Sharding',
        description: 'Partition data across multiple database instances by a shard key (e.g., customer_id). Horizontal scaling for write-heavy workloads.',
        accent: 'red',
      },
      {
        icon: '➡️',
        title: 'CQRS Split Database',
        description: 'Separate read and write databases. Writes go to normalized write DB, reads from optimized read DB. Projections keep them in sync.',
        accent: 'sky',
      },
      {
        icon: '📡',
        title: 'Change Data Capture (CDC)',
        description: 'Capture database changes as a stream of events. Trigger downstream processes, update caches, replicate to other systems.',
        accent: 'pink',
      },
      {
        icon: '🗑️',
        title: 'Soft Deletes',
        description: 'Mark records as deleted with a timestamp rather than removing them. Preserves history and allows recovery. Add filter to queries.',
        accent: 'purple',
      },
      {
        icon: '⏰',
        title: 'Temporal Tables',
        description: 'Database-native versioning. Track row changes over time. Queries can see historical versions. Available in SQL Server, PostgreSQL.',
        accent: 'cyan',
      },
      {
        icon: '🔒',
        title: 'Optimistic Concurrency',
        description: 'Use version numbers or timestamps instead of locks. Last writer wins after checking version hasn\'t changed. Good for distributed systems.',
        accent: 'amber',
      },
    ],
  },
  {
    id: 'api-patterns',
    icon: '🌐',
    iconBg: 'bg-red-50',
    title: 'API Patterns',
    count: '6',
    type: 'cards',
    cards: [
      {
        icon: '📝',
        title: 'REST (Representational State Transfer)',
        description: 'Resource-oriented APIs using HTTP verbs (GET, POST, PUT, DELETE). Stateless, cacheable, standardized. Most common pattern. Status codes indicate outcome.',
        accent: 'purple',
        code: 'POST /api/orders\nGET /api/orders/123\nPUT /api/orders/123\nDELETE /api/orders/123',
        lang: 'text',
      },
      {
        icon: '🔷',
        title: 'GraphQL',
        description: 'Query language for APIs. Clients request exact data needed, avoiding over-fetching. Strong typing, introspection, aggregates data from multiple sources.',
        accent: 'cyan',
        code: 'query {\n  order(id: 123) {\n    id\n    customer { name email }\n    items { sku quantity }\n  }\n}',
        lang: 'graphql',
      },
      {
        icon: '⚡',
        title: 'gRPC',
        description: 'High-performance RPC using HTTP/2 and Protocol Buffers. Typed contracts, streaming, multiplexing. Excellent for service-to-service communication.',
        accent: 'amber',
        pills: [{ label: 'Protocol', variant: 'tag' }],
      },
      {
        icon: '📡',
        title: 'WebSockets & SSE',
        description: 'Real-time bidirectional (WebSocket) or server-to-client (SSE) communication. Avoid polling. Good for notifications and live updates.',
        accent: 'green',
      },
      {
        icon: '🚀',
        title: 'Minimal APIs',
        description: 'Light-weight, convention-free API definition. Map HTTP endpoints directly to handler functions. Less ceremony than controllers. Common in .NET 6+.',
        accent: 'red',
        pills: [{ label: '.NET', variant: 'dotnet' }],
      },
      {
        icon: '🚪',
        title: 'API Gateway',
        description: 'Single entry point for clients. Routes requests, handles authentication, rate limiting, response transformation. Decouples clients from backend services.',
        accent: 'pink',
      },
    ],
  },
  {
    id: 'messaging',
    icon: '💬',
    iconBg: 'bg-sky-50',
    title: 'Messaging & Events',
    count: '9',
    type: 'cards',
    cards: [
      {
        icon: '📢',
        title: 'Pub/Sub (Publish/Subscribe)',
        description: 'Publishers send messages to a topic; subscribers receive copies. Decouples producers from consumers. Examples: Azure Service Bus Topics, AWS SNS, RabbitMQ Topic Exchange.',
        accent: 'purple',
      },
      {
        icon: '📦',
        title: 'Message Queue',
        description: 'FIFO delivery of messages to a queue. Single consumer per message. Guarantees order and delivery. Examples: Azure Queue Storage, RabbitMQ Queues, SQS.',
        accent: 'cyan',
      },
      {
        icon: '⚡',
        title: 'Event Streaming',
        description: 'Append-only log of events. Consumers read from any offset. Replay-able history. Examples: Kafka, Pulsar, Azure Event Hubs.',
        accent: 'amber',
        meta: [{ label: 'Delivery', value: 'At-Least-Once' }],
      },
      {
        icon: '⚠️',
        title: 'Dead Letter Queue (DLQ)',
        description: 'Messages that fail processing multiple times are moved to a DLQ for investigation. Prevents poison pill messages from blocking queue.',
        accent: 'red',
      },
      {
        icon: '👥',
        title: 'Competing Consumers',
        description: 'Multiple instances consume from same queue in parallel. Each message processed once. Scale processing by adding consumers.',
        accent: 'green',
      },
      {
        icon: '🔄',
        title: 'Request-Reply Pattern',
        description: 'Sender publishes request on a queue, receiver processes and replies on reply queue. Synchronous semantics over async transport.',
        accent: 'sky',
      },
      {
        icon: '📎',
        title: 'Claim Check Pattern',
        description: 'Large message payload moved to blob storage; message contains reference/claim check. Reduces message size and bus load.',
        accent: 'pink',
      },
      {
        icon: '💃',
        title: 'Choreography',
        description: 'Services communicate directly via events. Each service knows what events trigger its actions. Distributed decision-making. Can get tangled.',
        accent: 'purple',
      },
      {
        icon: '🎼',
        title: 'Orchestration',
        description: 'Central orchestrator/saga manager directs the flow. Services do not know about each other. Clearer flow but central point of failure.',
        accent: 'cyan',
      },
    ],
  },
  {
    id: 'concurrency',
    icon: '⚙️',
    iconBg: 'bg-amber-50',
    title: 'Concurrency',
    count: '6',
    type: 'cards',
    cards: [
      {
        icon: '⏳',
        title: 'Async/Await',
        description: 'Non-blocking operations that free up threads while waiting. Efficient use of thread pool. Syntactically simple with async/await keywords. Standard pattern.',
        accent: 'purple',
        code: 'public async Task<Order> GetOrderAsync(int id) {\n  var order = await _db.Orders.FindAsync(id);\n  var items = await _db.OrderItems\n    .Where(i => i.OrderId == id)\n    .ToListAsync();\n  return order;\n}',
        lang: 'csharp',
      },
      {
        icon: '🔒',
        title: 'Mutex/Lock/Semaphore',
        description: 'Mutual exclusion for accessing shared resources. Mutex (binary), Lock (reentrant), Semaphore (count). Risk of deadlock. Use sparingly in async code.',
        accent: 'cyan',
      },
      {
        icon: '🚇',
        title: 'Channels',
        description: 'Thread-safe communication between concurrent tasks/goroutines. Producer-consumer pattern. Typed, built-in cancellation. Rust: mpsc channels, C#: System.Threading.Channels.',
        accent: 'amber',
      },
      {
        icon: '⚡',
        title: 'Thread Pool / Task Parallel',
        description: 'Automatically manage thread creation and reuse. Task Parallel Library (C#) coordinates work. Avoids manual thread creation and context switching overhead.',
        accent: 'green',
      },
      {
        icon: '🎯',
        title: 'Single-Flight/Deduplication',
        description: 'Coalesce multiple identical concurrent requests into a single operation. Return same result to all requesters. Avoid thundering herd.',
        accent: 'red',
      },
      {
        icon: '🦀',
        title: 'Rust Ownership & Borrowing',
        description: 'Compile-time concurrency safety. Ownership rules prevent data races. Move vs borrow semantics. No need for locks on immutable shared data.',
        accent: 'pink',
        pills: [{ label: 'Rust', variant: 'rust' }],
      },
    ],
  },
  {
    id: 'testing',
    icon: '🧪',
    iconBg: 'bg-green-50',
    title: 'Testing',
    count: '8',
    type: 'cards',
    cards: [
      {
        icon: '📍',
        title: 'Unit Tests',
        description: 'Test individual functions/methods in isolation with mocks. Fast, fine-grained feedback. Cover happy paths and edge cases.',
        accent: 'purple',
        meta: [{ label: 'Pyramid', value: '70%' }],
      },
      {
        icon: '🔗',
        title: 'Integration Tests',
        description: 'Test components working together (database, external services). Use test doubles or in-memory databases. Slower but more realistic.',
        accent: 'cyan',
        meta: [{ label: 'Pyramid', value: '20%' }],
      },
      {
        icon: '📋',
        title: 'Contract Tests',
        description: 'Verify API contracts between services without full E2E testing. Consumer-driven contracts. Catch integration issues early.',
        accent: 'amber',
      },
      {
        icon: '🎲',
        title: 'Property-Based Tests',
        description: 'Generate random inputs and verify invariants hold. Examples: QuickCheck, Hypothesis. Find edge cases you didn\'t think of.',
        accent: 'green',
      },
      {
        icon: '📸',
        title: 'Snapshot Tests',
        description: 'Capture output (JSON, HTML) and verify against stored snapshots. Good for UI, configuration, complex data structures.',
        accent: 'red',
      },
      {
        icon: '🏛️',
        title: 'Architecture Tests',
        description: 'Verify code structure adheres to design rules. ArchUnit (Java), NArchitecture (C#). Enforce layering, dependencies, naming conventions.',
        accent: 'sky',
      },
      {
        icon: '📊',
        title: 'Load/Performance Tests',
        description: 'Simulate realistic load. Measure throughput, latency, resource usage. Find bottlenecks. Examples: K6, JMeter, Apache Bench.',
        accent: 'pink',
      },
      {
        icon: '🧬',
        title: 'Mutation Testing',
        description: 'Inject small code changes and verify tests catch them. Low mutation score indicates insufficient test coverage.',
        accent: 'purple',
      },
    ],
    callout: {
      type: 'purple',
      icon: '🔺',
      text: 'Testing Pyramid: 70% unit tests, 20% integration tests, 10% E2E. Many fast unit tests, fewer slow E2E tests.',
    },
  },
  {
    id: 'error-handling',
    icon: '❌',
    iconBg: 'bg-red-50',
    title: 'Error Handling',
    count: '4',
    type: 'cards',
    cards: [
      {
        icon: '📦',
        title: 'Result/Either Type',
        description: 'Return Result<T, E> or Either<L, R> instead of throwing exceptions. Explicit error handling. Composable with map/flatMap. Rust Result, Scala Either.',
        accent: 'purple',
        code: 'pub fn process_order(order: Order) -> Result<OrderConfirmation, OrderError> {\n  let payment = process_payment(&order)?;\n  let confirmation = create_confirmation(&order, &payment)?;\n  Ok(confirmation)\n}',
        lang: 'rust',
      },
      {
        icon: '🏗️',
        title: 'Exception Hierarchy',
        description: 'Create domain-specific exception classes inheriting from base. Catch specific exceptions. Avoid catching generic Exception.',
        accent: 'cyan',
        code: 'public class OrderException : Exception { }\npublic class InsufficientFundsException : OrderException { }\npublic class ItemOutOfStockException : OrderException { }',
        lang: 'csharp',
      },
      {
        icon: '🔄',
        title: 'Retry with Backoff',
        description: 'Exponential or fixed backoff for transient failures. Jitter to avoid thundering herd. Max retries to avoid infinite loops. Use Polly (C#), tenacity (Python).',
        accent: 'amber',
        code: 'var policy = Policy\n  .Handle<HttpRequestException>()\n  .WaitAndRetry(new[] {\n    TimeSpan.FromSeconds(1),\n    TimeSpan.FromSeconds(2),\n    TimeSpan.FromSeconds(4)\n  });\nawait policy.ExecuteAsync(() => client.GetAsync(url));',
        lang: 'csharp',
      },
      {
        icon: '⚡',
        title: 'Circuit Breaker',
        description: 'Prevent cascading failures by stopping requests to failing service. Open → Half-Open → Closed states. Polly, Hystrix, or cloud SDK.',
        accent: 'green',
      },
    ],
  },
  {
    id: 'security',
    icon: '🔐',
    iconBg: 'bg-pink-50',
    title: 'Security',
    count: '12',
    type: 'cards',
    cards: [
      {
        icon: '🔑',
        title: 'OAuth 2.0 & OpenID Connect',
        description: 'Delegate authentication to identity provider. OAuth 2.0 for authorization, OIDC adds identity. Authorization Code flow for web, PKCE for SPAs.',
        accent: 'purple',
        meta: [{ label: 'Standard', value: 'RFC 6749' }],
      },
      {
        icon: '🎫',
        title: 'JWT + Refresh Tokens',
        description: 'Stateless authentication with JWTs. Short-lived access tokens + long-lived refresh tokens. No session storage needed. Verify signature server-side.',
        accent: 'cyan',
      },
      {
        icon: '👥',
        title: 'RBAC & ABAC',
        description: 'Role-Based (RBAC) or Attribute-Based (ABAC) access control. RBAC: users have roles with permissions. ABAC: fine-grained rules on user/resource attributes.',
        accent: 'amber',
      },
      {
        icon: '🔓',
        title: 'API Key Authentication',
        description: 'Simple token-based auth for service-to-service or public APIs. Stateless, easy to revoke. Send in header or query. Less secure than OAuth.',
        accent: 'green',
      },
      {
        icon: '✔️',
        title: 'Input Validation',
        description: 'Validate all input at API boundaries. Type, length, format, range. Use libraries like FluentValidation (C#), Pydantic (Python). Prevent injection attacks.',
        accent: 'red',
      },
      {
        icon: '🛡️',
        title: 'Parameterized Queries',
        description: 'Use parameterized statements to prevent SQL injection. Never concatenate user input into SQL. All major ORMs and drivers support this.',
        accent: 'sky',
      },
      {
        icon: '🔒',
        title: 'Secrets Management',
        description: 'Store secrets (API keys, passwords, connection strings) in secure vaults, not code. Azure Key Vault, AWS Secrets Manager, HashiCorp Vault.',
        accent: 'pink',
      },
      {
        icon: '🌐',
        title: 'CORS (Cross-Origin Resource Sharing)',
        description: 'Control which origins can access API. Specify allowed origins, methods, headers. Prevents unauthorized cross-site requests.',
        accent: 'purple',
      },
      {
        icon: '⏱️',
        title: 'Rate Limiting',
        description: 'Limit requests per IP/user/key to prevent abuse and DoS. Use token bucket or sliding window algorithm. Return 429 Too Many Requests.',
        accent: 'cyan',
      },
      {
        icon: '🔗',
        title: 'Zero Trust',
        description: 'Never trust, always verify. Authenticate and authorize every request/connection. Encrypt in transit and at rest. Assume breach mentality.',
        accent: 'amber',
      },
      {
        icon: '🔄',
        title: 'Idempotency',
        description: 'API operations should be safe to retry. Use idempotency keys to prevent duplicate processing. Critical for payment systems.',
        accent: 'green',
      },
      {
        icon: '📝',
        title: 'Audit Logging',
        description: 'Log all security events: authentication, authorization, data access, changes. Immutable logs for compliance and investigation.',
        accent: 'red',
      },
    ],
  },
  {
    id: 'observability',
    icon: '🔍',
    iconBg: 'bg-purple-50',
    title: 'Observability',
    count: '5',
    type: 'cards',
    cards: [
      {
        icon: '📋',
        title: 'Structured Logging',
        description: 'Log as JSON with consistent fields (timestamp, level, trace-id, user-id, message). Query and aggregate logs by field. Tools: ELK, Loki, CloudWatch.',
        accent: 'purple',
        code: '{\n  "timestamp": "2024-01-15T10:30:00Z",\n  "level": "INFO",\n  "trace_id": "abc123",\n  "user_id": 456,\n  "message": "Order created",\n  "order_id": 789\n}',
        lang: 'json',
      },
      {
        icon: '📊',
        title: 'Metrics',
        description: 'Quantitative measurements: request rate, latency, error rate, queue depth. Emit via Prometheus, Datadog, or cloud provider. Alert on thresholds.',
        accent: 'cyan',
      },
      {
        icon: '🔗',
        title: 'Distributed Tracing',
        description: 'Track request flow across services using trace and span IDs. Visualize latency bottlenecks. Tools: Jaeger, Zipkin, Datadog APM.',
        accent: 'amber',
      },
      {
        icon: '❤️',
        title: 'Health Checks',
        description: 'Expose /health endpoint returning service health status. Check dependencies (database, cache). Used for load balancing and orchestration.',
        accent: 'green',
      },
      {
        icon: '🚨',
        title: 'Alerting',
        description: 'Set up alerts on metrics, logs, and traces. Alert on anomalies and thresholds. Route to on-call via PagerDuty, OpsGenie, etc.',
        accent: 'red',
      },
    ],
  },
  {
    id: 'performance',
    icon: '⚡',
    iconBg: 'bg-cyan-50',
    title: 'Performance',
    count: '6',
    type: 'cards',
    cards: [
      {
        icon: '💾',
        title: 'Caching',
        description: 'In-memory (Redis, Memcached), application-level, HTTP caching. Cache-aside pattern. Set appropriate TTLs. Handle invalidation carefully.',
        accent: 'purple',
      },
      {
        icon: '📄',
        title: 'Pagination',
        description: 'Return large result sets in pages. Cursor-based pagination scales better than offset. Include total count carefully (can be expensive).',
        accent: 'cyan',
      },
      {
        icon: '📦',
        title: 'Batch Processing',
        description: 'Group operations to reduce round trips. Bulk insert/update queries. Batch message publishing. Trade latency for throughput.',
        accent: 'amber',
      },
      {
        icon: '🔑',
        title: 'Database Indexing',
        description: 'Add indexes on frequently queried columns. Watch N+1 queries. Analyze query plans. Composite indexes for multi-column filters.',
        accent: 'green',
      },
      {
        icon: '⚡',
        title: 'Async Everything',
        description: 'Use async I/O for network calls, file access, database queries. Free up threads. Apply backpressure to avoid overload.',
        accent: 'red',
      },
      {
        icon: '🔗',
        title: 'Connection Pooling',
        description: 'Reuse database/HTTP connections via pools. Reduce connection overhead. Configure pool size based on workload.',
        accent: 'sky',
      },
    ],
  },
  {
    id: 'deployment',
    icon: '🚀',
    iconBg: 'bg-green-50',
    title: 'Deployment',
    count: '8',
    type: 'cards',
    cards: [
      {
        icon: '🔵🟢',
        title: 'Blue/Green Deployment',
        description: 'Run two identical production environments. Switch traffic from blue to green. Zero downtime. Instant rollback by switching back.',
        accent: 'purple',
      },
      {
        icon: '🐤',
        title: 'Canary Deployment',
        description: 'Gradually shift traffic to new version. Start with 5%, monitor, increase to 50%, then 100%. Catch issues with partial rollout.',
        accent: 'cyan',
      },
      {
        icon: '🚩',
        title: 'Feature Flags',
        description: 'Toggle features on/off at runtime without redeploy. A/B test, gradual rollout, kill switches. LaunchDarkly, Unleash, or custom.',
        accent: 'amber',
      },
      {
        icon: '🔄',
        title: 'Rolling Deployment',
        description: 'Gradually replace old instances with new version. Requires load balancer and health checks. Brief period with mixed versions.',
        accent: 'green',
      },
      {
        icon: '❄️',
        title: 'Immutable Infrastructure',
        description: 'Build versioned machine images (AMI, Docker image). Deploy by replacing entire instances, never modify in-place. Reproducible and reliable.',
        accent: 'red',
      },
      {
        icon: '🔀',
        title: 'GitOps',
        description: 'Git repo as source of truth for infrastructure and applications. Declarative config, automated sync. Tools: ArgoCD, Flux.',
        accent: 'sky',
      },
      {
        icon: '🚪',
        title: 'Health Gates',
        description: 'Automated checks before deployment: tests pass, security scan clears, performance benchmarks acceptable. Prevent bad deployments.',
        accent: 'pink',
      },
      {
        icon: '🔧',
        title: 'Migration Safety',
        description: 'Plan schema changes to work with both old and new code. Deploy code before schema or vice versa. Use feature flags to control behavior.',
        accent: 'purple',
      },
    ],
  },
  {
    id: 'dotnet',
    icon: '#',
    iconBg: 'bg-purple-50',
    title: '.NET/C# Specific',
    count: '6',
    type: 'cards',
    cards: [
      {
        icon: '🔗',
        title: 'Dependency Injection',
        description: 'Built-in DI container in .NET. Register services with IServiceCollection. Constructor injection. Transient, scoped, singleton lifetimes.',
        accent: 'purple',
        pills: [{ label: '.NET', variant: 'dotnet' }],
        code: 'services.AddScoped<IOrderRepository, OrderRepository>();\nservices.AddSingleton<ILogger, Logger>();\nservices.AddTransient<OrderService>();',
        lang: 'csharp',
      },
      {
        icon: '🔀',
        title: 'Middleware Pipeline',
        description: 'Request flows through middleware components. Each adds behavior (logging, auth, error handling). Order matters. Use app.Use() to add custom middleware.',
        accent: 'cyan',
        code: 'app.UseAuthentication();\napp.UseAuthorization();\napp.UseCustomErrorHandling();\napp.MapControllers();',
        lang: 'csharp',
      },
      {
        icon: '✔️',
        title: 'FluentValidation',
        description: 'Fluent API for defining validation rules. Separate validators from models. Composable, reusable, testable. Integrates with Minimal APIs.',
        accent: 'amber',
        pills: [{ label: '.NET', variant: 'dotnet' }],
        code: 'public class CreateOrderValidator : AbstractValidator<CreateOrderCommand> {\n  public CreateOrderValidator() {\n    RuleFor(x => x.CustomerId).NotEmpty();\n    RuleFor(x => x.Items).NotEmpty().WithMessage("Must have items");\n  }\n}',
        lang: 'csharp',
      },
      {
        icon: '🗺️',
        title: 'AutoMapper & Mapster',
        description: 'Convention-based object mapping. DTO ↔ Domain models. Reduce boilerplate. Mapster is faster than AutoMapper.',
        accent: 'green',
        pills: [{ label: '.NET', variant: 'dotnet' }],
      },
      {
        icon: '⏰',
        title: 'Background Services',
        description: 'IHostedService for long-running tasks. Worker services run continuously. Scoped dependency injection for each iteration.',
        accent: 'red',
        pills: [{ label: '.NET', variant: 'dotnet' }],
      },
      {
        icon: '🎯',
        title: 'Vertical Slice Architecture',
        description: 'Organize by feature, not layer. Each feature has command, handler, validator, projections. Reduces cross-feature coupling.',
        accent: 'pink',
        pills: [{ label: '.NET', variant: 'dotnet' }],
        meta: [{ label: 'Tools', value: 'MediatR, FastEndpoints' }],
      },
    ],
    callout: {
      type: 'purple',
      icon: '📚',
      text: 'Key .NET libraries: Entity Framework Core (ORM), Dapper (Micro-ORM), MassTransit (Messaging), NUnit/xUnit (Testing), Serilog (Logging).',
    },
  },
  {
    id: 'python',
    icon: '🐍',
    iconBg: 'bg-cyan-50',
    title: 'Python Specific',
    count: '6',
    type: 'cards',
    cards: [
      {
        icon: '⚡',
        title: 'FastAPI',
        description: 'Modern, fast web framework for building APIs. Automatic OpenAPI/Swagger docs. Built on Starlette and Pydantic. Type hints drive validation and docs.',
        accent: 'purple',
        pills: [{ label: 'Python', variant: 'python' }],
        code: 'from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass Order(BaseModel):\n    id: int\n    total: float\n\n@app.get("/orders/{order_id}")\nasync def get_order(order_id: int) -> Order:\n    return Order(id=order_id, total=99.99)',
        lang: 'python',
      },
      {
        icon: '✔️',
        title: 'Pydantic v2',
        description: 'Data validation and parsing using Python type hints. Automatic schema generation. Serialization/deserialization. Settings management.',
        accent: 'cyan',
        pills: [{ label: 'Python', variant: 'python' }],
        code: 'from pydantic import BaseModel, Field, validator\n\nclass Order(BaseModel):\n    id: int = Field(..., gt=0)\n    total: float = Field(..., gt=0)\n    \n    @validator("total")\n    def validate_total(cls, v):\n        if v > 1000000:\n            raise ValueError("Total too large")\n        return v',
        lang: 'python',
      },
      {
        icon: '🗄️',
        title: 'SQLAlchemy 2.x',
        description: 'SQL toolkit and Object-Relational Mapper. Modern API with type hints. SQLAlchemy 2.0+ emphasizes async and explicit SQL.',
        accent: 'amber',
        pills: [{ label: 'Python', variant: 'python' }],
      },
      {
        icon: '🔗',
        title: 'Dependency Injection',
        description: 'Use dataclasses/Pydantic for DI. Dependency() in FastAPI for request scope. Or use libraries like python-dependency-injector.',
        accent: 'green',
        pills: [{ label: 'Python', variant: 'python' }],
      },
      {
        icon: '⏳',
        title: 'Async Patterns',
        description: 'asyncio for concurrency. async/await syntax. Asyncio.gather() for concurrent tasks. Event loops and tasks. Understanding asyncio is critical.',
        accent: 'red',
        pills: [{ label: 'Python', variant: 'python' }],
      },
      {
        icon: '📦',
        title: 'Dataclasses & Protocols',
        description: 'dataclasses for lightweight data structures. Protocols (structural typing) for flexible interfaces. TypedDict for dict typing.',
        accent: 'pink',
        pills: [{ label: 'Python', variant: 'python' }],
      },
    ],
    callout: {
      type: 'cyan',
      icon: '📚',
      text: 'Key Python ecosystem: pytest (Testing), sqlalchemy (ORM), httpx (HTTP client), uvicorn (ASGI server), black (Formatter), ruff (Linter).',
    },
  },
  {
    id: 'rust',
    icon: '🦀',
    iconBg: 'bg-amber-50',
    title: 'Rust Specific',
    count: '6',
    type: 'cards',
    cards: [
      {
        icon: '⚡',
        title: 'Tokio',
        description: 'Async runtime for Rust. Tokio::spawn for tasks, channels for communication, select! for multiplexing. Production-grade for building servers.',
        accent: 'purple',
        pills: [{ label: 'Rust', variant: 'rust' }],
        code: 'use tokio::task;\n\n#[tokio::main]\nasync fn main() {\n    let task1 = task::spawn(async { 1 + 1 });\n    let result = task1.await.unwrap();\n    println!("Result: {}", result);\n}',
        lang: 'rust',
      },
      {
        icon: '🌐',
        title: 'Axum',
        description: 'Modern, ergonomic web framework built on Tokio. Type-safe extractors. Clean routing DSL. Router composition. Built-in middleware.',
        accent: 'cyan',
        pills: [{ label: 'Rust', variant: 'rust' }],
        code: 'use axum::{routing::get, Router};\n\n#[tokio::main]\nasync fn main() {\n    let app = Router::new()\n        .route("/orders/:id", get(get_order));\n    \n    axum::Server::bind(&"0.0.0.0:3000".parse()?)\n        .serve(app.into_make_service())\n        .await?\n}',
        lang: 'rust',
      },
      {
        icon: '🗄️',
        title: 'sqlx & SeaORM',
        description: 'sqlx: compile-time checked SQL queries. SeaORM: async-first ORM. Both leverage Rust type system and async/await.',
        accent: 'amber',
        pills: [{ label: 'Rust', variant: 'rust' }],
      },
      {
        icon: '❌',
        title: 'Error Handling',
        description: 'Result<T, E> type. Custom error enums. thiserror/anyhow crates for ergonomic error handling. Compile-time enforcement of error handling.',
        accent: 'green',
        pills: [{ label: 'Rust', variant: 'rust' }],
        code: 'pub fn process_order(order: Order) -> Result<(), OrderError> {\n    validate_order(&order)?;\n    let payment = charge_payment(&order)?;\n    Ok(())\n}',
        lang: 'rust',
      },
      {
        icon: '🎯',
        title: 'Trait-Based Design',
        description: 'Use traits for abstractions. Trait objects for dynamic dispatch. Blanket implementations for generics. Natural for DI and mocking.',
        accent: 'red',
        pills: [{ label: 'Rust', variant: 'rust' }],
      },
      {
        icon: '📤',
        title: 'Serde',
        description: 'Serialize/deserialize Rust data structures to/from JSON, TOML, YAML, etc. Derive macros make it easy. Type-safe and performant.',
        accent: 'pink',
        pills: [{ label: 'Rust', variant: 'rust' }],
      },
    ],
    callout: {
      type: 'amber',
      icon: '📚',
      text: 'Key Rust ecosystem: tokio (Async runtime), axum (Web framework), sqlx (Database), serde (Serialization), tracing (Logging), uuid (IDs).',
    },
  },
];
