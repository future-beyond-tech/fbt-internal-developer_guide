// FBT System Design Intelligence Master Reference - Complete Typed Data Export
// Source: DesignGurus System Design Interview curriculum → FBT architecture mapping

export interface NavSection {
  label: string;
  items: { id?: string; title?: string; label?: string; href?: string }[];
}

export interface Card {
  icon?: string;
  title: string;
  subtitle?: string;
  description: string;
  accent?: string;
  pills?: { label: string; variant: string }[];
  meta?: { label: string; value: string }[];
  code?: string;
  lang?: string;
  details?: string;
  variant?: string;
  items?: string[];
  fbtApplication?: string;
  category?: string;
  [key: string]: unknown;
}

export interface TableRow {
  [key: string]: string;
}

export interface TableData {
  headers: string[];
  rows: TableRow[];
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
  title: string;
  description: string;
  type: 'cards' | 'table' | 'patterns' | 'flow' | 'accordion' | 'tabs' | 'diagram';
  module?: string;
  subtitle?: string;
  intro?: string;
  data?: Card[] | TableData | PatternGroup[] | any;
  [key: string]: unknown;
}

export interface HeroData {
  tag: string;
  title: string;
  titleParts: { text: string; gradient?: boolean }[];
  description: string;
  metrics: { value: string; label: string }[];
}

// ════════════════════════════════════════════════════════════════════════════════
// HERO SECTION
// ════════════════════════════════════════════════════════════════════════════════

export const systemDesignHero: HeroData = {
  tag: 'designgurus.io/system-design-interview · complete extraction',
  title: 'SYSTEM DESIGN\nINTELLIGENCE FOR FBT',
  titleParts: [
    { text: 'SYSTEM DESIGN' },
    { text: 'INTELLIGENCE FOR FBT', gradient: true },
  ],
  description:
    'Every concept, pattern, and principle from the DesignGurus System Design Interview curriculum — extracted, analysed, and mapped 1:1 to FBT\'s current and future engineering challenges. This is your architecture decision Bible.',
  metrics: [
    { value: '95+', label: 'Concepts' },
    { value: '18', label: 'System Designs' },
    { value: '15', label: 'Patterns' },
    { value: '4', label: 'Projects' },
    { value: '∞', label: 'Scale' },
    { value: 'NOW', label: 'Apply' },
  ],
};

// ════════════════════════════════════════════════════════════════════════════════
// NAVIGATION STRUCTURE
// ════════════════════════════════════════════════════════════════════════════════

export const systemDesignNav: NavSection[] = [
  {
    label: 'Course Modules',
    items: [
      { id: 'foundations', title: 'System Foundations', href: '#foundations', label: '12 concepts' },
      { id: 'distributed', title: 'Distributed Systems', href: '#distributed', label: '18 patterns' },
      { id: 'data-storage', title: 'Data & Storage', href: '#data-storage', label: '14 concepts' },
      { id: 'communication', title: 'Communication', href: '#communication', label: '10 protocols' },
      { id: 'reliability', title: 'Reliability Patterns', href: '#reliability', label: '12 patterns' },
      { id: 'scalability', title: 'Scalability', href: '#scalability', label: '10 strategies' },
      { id: 'security-sd', title: 'Security & Auth', href: '#security-sd', label: '8 patterns' },
      { id: 'observability', title: 'Observability', href: '#observability', label: '7 pillars' },
      { id: 'design-problems', title: 'System Designs', href: '#design-problems', label: '18 designs' },
      { id: 'fbt-mapping', title: 'FBT Project Mapping', href: '#fbt-mapping' },
      { id: 'roadmap', title: 'Implementation Roadmap', href: '#roadmap' },
    ],
  },
  {
    label: 'FBT Projects',
    items: [
      { id: 'rentflow', title: 'RentFlow', href: '#fbt-mapping' },
      { id: 'zentra', title: 'Zentra', href: '#fbt-mapping' },
      { id: 'catchmoment', title: 'CatchMoment', href: '#fbt-mapping' },
      { id: 'firose', title: 'FIROSE Group', href: '#fbt-mapping' },
    ],
  },
];

// ════════════════════════════════════════════════════════════════════════════════
// SECTION 1: SYSTEM DESIGN FOUNDATIONS (12 CONCEPTS)
// ════════════════════════════════════════════════════════════════════════════════

const foundationsCards: Card[] = [
  {
    icon: '📐',
    title: 'Scalability',
    category: 'FOUNDATIONS',
    description:
      'Vertical scaling (bigger machines) vs Horizontal scaling (more machines). Vertical has a ceiling; horizontal requires stateless design. Scale-cube model: X-axis (clone), Y-axis (decompose), Z-axis (partition).',
    fbtApplication:
      'RentFlow must scale horizontally — multi-tenant means unpredictable load spikes when large PG owners onboard hundreds of residents simultaneously. Railway auto-scaling needs stateless .NET API pods.',
    pills: [
      { label: 'RentFlow', variant: 'primary' },
      { label: 'CatchMoment', variant: 'cyan' },
      { label: 'Railway', variant: 'secondary' },
      { label: 'Horizontal', variant: 'secondary' },
    ],
    accent: 'lime',
  },
  {
    icon: '⚡',
    title: 'Reliability',
    category: 'FOUNDATIONS',
    description:
      'System continues to work correctly even when things go wrong. Fault-tolerant through redundancy, replication, and failover. Mean Time Between Failures (MTBF) and Mean Time To Recovery (MTTR) are key metrics.',
    fbtApplication:
      'Zentra MUST be highly reliable — every FBT product depends on it for auth. Single Zentra failure = all products down. Railway multi-instance deployment with health checks and auto-restart.',
    pills: [
      { label: 'Zentra Critical', variant: 'sky' },
      { label: 'MTBF/MTTR', variant: 'secondary' },
      { label: 'Redundancy', variant: 'secondary' },
    ],
    accent: 'cyan',
  },
  {
    icon: '🟢',
    title: 'Availability',
    category: 'FOUNDATIONS',
    description:
      'Percentage of time system is operational. 99.9% = 8.7 hours downtime/year. 99.99% = 52 minutes/year. 99.999% = 5 minutes/year. Availability = MTBF / (MTBF + MTTR). High availability requires eliminating single points of failure.',
    fbtApplication:
      'RentFlow SLA target: 99.9% (8.7hrs/yr). Zentra: 99.95%. CatchMoment GPU processing can be 99.5% (processing delays acceptable, not outages). FIROSE e-commerce: 99.9% during business hours.',
    pills: [
      { label: 'SLA Targets', variant: 'primary' },
      { label: '99.9%', variant: 'secondary' },
      { label: 'SPOF elimination', variant: 'secondary' },
    ],
    accent: 'amber',
  },
  {
    icon: '⚖️',
    title: 'CAP Theorem',
    category: 'DISTRIBUTED THEORY',
    description:
      'A distributed system can guarantee only 2 of: Consistency (all nodes see same data), Availability (every request gets a response), Partition Tolerance (system works despite network splits). CP systems (PostgreSQL), AP systems (Cassandra), CA (impossible in distributed systems).',
    fbtApplication:
      'RentFlow payment data = CP (consistency critical, can\'t double-charge). CatchMoment video metadata = AP (availability over perfect consistency, eventual sync is fine). Zentra tokens = CP (auth must be consistent).',
    pills: [
      { label: 'RentFlow: CP', variant: 'primary' },
      { label: 'CatchMoment: AP', variant: 'cyan' },
      { label: 'Zentra: CP', variant: 'sky' },
    ],
    accent: 'pink',
  },
  {
    icon: '🌊',
    title: 'PACELC Theorem',
    category: 'EXTENDED CAP',
    description:
      'Extends CAP: in case of Partition (P): choose Availability or Consistency. Else (E): choose Latency or Consistency. More nuanced — even without partitions, there\'s a latency vs consistency trade-off. DynamoDB: PA/EL. PostgreSQL: PC/EC.',
    fbtApplication:
      'RentFlow reservation system: PC/EC — consistency always wins. CatchMoment event uploads: PA/EL — low latency upload matters more than immediate consistency across nodes.',
    pills: [
      { label: 'PA/EL', variant: 'secondary' },
      { label: 'PC/EC', variant: 'secondary' },
      { label: 'Trade-offs', variant: 'secondary' },
    ],
    accent: 'purple',
  },
  {
    icon: '🔗',
    title: 'Consistent Hashing',
    category: 'DATA DISTRIBUTION',
    description:
      'Hash ring where nodes and keys are placed. When a node joins/leaves, only K/N keys need redistribution (K=keys, N=nodes). Virtual nodes improve load distribution. Used by Cassandra, DynamoDB, CDNs.',
    fbtApplication:
      'CatchMoment video upload routing — consistent hashing routes uploads to the same processing node for a given event, enabling local caching. RentFlow Redis cluster uses consistent hashing for session distribution across cache nodes.',
    pills: [
      { label: 'CatchMoment', variant: 'cyan' },
      { label: 'Redis Cluster', variant: 'primary' },
      { label: 'Virtual nodes', variant: 'secondary' },
    ],
    accent: 'sky',
  },
  {
    icon: '📊',
    title: 'Load Balancing',
    category: 'TRAFFIC DISTRIBUTION',
    description:
      'Algorithms: Round Robin, Weighted Round Robin, Least Connections, Least Response Time, IP Hash, Resource-Based. Layer 4 (TCP) vs Layer 7 (HTTP/content-aware). Active health checks, passive monitoring.',
    fbtApplication:
      'Railway provides L7 load balancing for RentFlow API. Zentra needs sticky sessions for token refresh flows — use IP Hash or cookie-based affinity. CatchMoment GPU worker pool: Least Connections to avoid overloading a single Modal instance.',
    pills: [
      { label: 'Railway LB', variant: 'primary' },
      { label: 'L7 HTTP', variant: 'secondary' },
      { label: 'Least Connections', variant: 'amber' },
    ],
    accent: 'lime',
  },
  {
    icon: '⚡',
    title: 'Caching',
    category: 'PERFORMANCE',
    description:
      'Cache-aside: app checks cache, loads from DB on miss. Write-through: write to cache and DB simultaneously. Write-back: write to cache, async persist. Write-around: write to DB, bypass cache. Eviction: LRU, LFU, FIFO. Cache stampede / thundering herd prevention.',
    fbtApplication:
      'RentFlow: Cache-aside for property listings (Redis, 5min TTL). Write-through for occupancy status (critical consistency). Zentra: Cache-aside for token validation (LRU, TTL = token expiry - 30s). CatchMoment: Cache event metadata write-through.',
    pills: [
      { label: 'Redis', variant: 'primary' },
      { label: 'Cache-aside', variant: 'secondary' },
      { label: 'Write-through', variant: 'secondary' },
      { label: 'LRU', variant: 'secondary' },
    ],
    accent: 'cyan',
  },
  {
    icon: '📡',
    title: 'Proxies',
    category: 'NETWORK ARCHITECTURE',
    description:
      'Forward proxy: client-side, hides client identity. Reverse proxy: server-side, hides server pool, adds TLS, compression, caching. Open proxy: accessible by anyone. NGINX, HAProxy, Traefik as reverse proxies. Service mesh (Istio, Linkerd) for internal.',
    fbtApplication:
      'Railway\'s built-in reverse proxy handles TLS termination for all FBT services. Vyxnos Shield is FBT\'s custom reverse proxy / API gateway with zero-trust enforcement. YARP in .NET 8 powers internal service routing between RentFlow, Zentra, and backend services.',
    pills: [
      { label: 'Vyxnos Shield', variant: 'primary' },
      { label: 'YARP', variant: 'secondary' },
      { label: 'Railway Proxy', variant: 'secondary' },
    ],
    accent: 'pink',
  },
  {
    icon: '🗄️',
    title: 'SQL vs NoSQL',
    category: 'DATA STORAGE',
    description:
      'SQL: ACID, structured, joins, vertical scaling. NoSQL types: Document (MongoDB), Key-Value (Redis, DynamoDB), Column-family (Cassandra), Graph (Neo4j). Choose based on: data structure, consistency needs, query patterns, scale requirements.',
    fbtApplication:
      'FBT uses PostgreSQL everywhere (ACID for financials, strong consistency). Redis for caching/sessions (key-value). CatchMoment could use MongoDB for flexible video event metadata. Future: Qdrant (vector) for AI search in CatchMoment and EduConnect.',
    pills: [
      { label: 'PostgreSQL', variant: 'primary' },
      { label: 'Redis', variant: 'secondary' },
      { label: 'Qdrant Vector', variant: 'cyan' },
      { label: 'ACID', variant: 'secondary' },
    ],
    accent: 'pink',
  },
  {
    icon: '🔢',
    title: 'Indexes & Efficiency',
    category: 'DATABASE PERF',
    description:
      'B-Tree index: balanced tree, good for range queries. Hash index: O(1) lookup, no range queries. Bitmap index: low cardinality columns. Composite indexes: multi-column. Trade-off: faster reads, slower writes, more storage. EXPLAIN ANALYZE for query planning.',
    fbtApplication:
      'RentFlow: Index every FK, (tenantId, status) composite indexes, GIN index for full-text search on property descriptions. Zentra: Hash index on token lookup by jti. CatchMoment: B-tree on (eventId, createdAt) for chronological video feeds.',
    pills: [
      { label: 'B-Tree', variant: 'primary' },
      { label: 'Composite', variant: 'secondary' },
      { label: 'GIN', variant: 'secondary' },
      { label: 'EXPLAIN', variant: 'secondary' },
    ],
    accent: 'purple',
  },
  {
    icon: '📈',
    title: 'Redundancy & Replication',
    category: 'HIGH AVAILABILITY',
    description:
      'Active-passive: standby takes over on failure. Active-active: all nodes serve traffic. Leader-follower replication: leader handles writes, followers serve reads. Multi-leader: conflict resolution required. Synchronous vs asynchronous replication trade-offs.',
    fbtApplication:
      'RentFlow PostgreSQL: Leader-follower with Railway managed DB. Read replicas for property listing queries (90% reads). Zentra: Active-passive failover for identity critical path. Future: Multi-region for RentFlow as it expands beyond Chennai.',
    pills: [
      { label: 'Read Replicas', variant: 'primary' },
      { label: 'Leader-Follower', variant: 'secondary' },
      { label: 'Active-Passive', variant: 'secondary' },
    ],
    accent: 'lime',
  },
];

// ════════════════════════════════════════════════════════════════════════════════
// SECTION 2: DISTRIBUTED SYSTEMS CONCEPTS (18 PATTERNS)
// ════════════════════════════════════════════════════════════════════════════════

const distributedAccordion = [
  {
    number: '2.1',
    title: 'Leader Election (Raft / Paxos)',
    brief: 'Distributed consensus for choosing a single coordinator node',
    priority: 'Critical',
    projects: [
      {
        name: 'RentFlow',
        color: 'cyan',
        desc: 'Background job workers (Hangfire) need leader election to prevent duplicate job execution across multiple API instances',
      },
      {
        name: 'Zentra',
        color: 'purple',
        desc: 'Token revocation list sync requires a leader node to push invalidation events to all instances',
      },
      {
        name: 'CatchMoment',
        color: 'pink',
        desc: 'Event stream processor on Temporal Cloud uses Raft internally for workflow coordination across workers',
      },
      {
        name: 'Future',
        color: 'amber',
        desc: 'Any FBT service running multiple replicas needs this. Redis Sentinel uses it for master election',
      },
    ],
    codeExample: `// Using Redis for distributed leader election in .NET 8
public class LeaderElectionService : BackgroundService
{
    private readonly IDatabase _redis;
    private const string LeaderKey = "rentflow:leader";

    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        while (!ct.IsCancellationRequested)
        {
            // Try to acquire leader lock with TTL`,
  },
  {
    number: '2.2',
    title: 'Gossip Protocol',
    brief: 'Peer-to-peer information dissemination without central coordinator',
    priority: 'High',
    projects: [
      {
        name: 'CatchMoment',
        color: 'pink',
        desc: 'Video processing worker discovery and heartbeat via gossip — knows which Modal instances are alive',
      },
      {
        name: 'Vyxnos Shield',
        color: 'secondary',
        desc: 'Zero-trust policy distribution across gateway nodes via gossip protocol',
      },
    ],
  },
  {
    number: '2.3',
    title: 'Vector Clocks & Causality',
    brief: 'Track happened-before relationships without synchronized clocks',
    priority: 'Medium',
    projects: [
      {
        name: 'RentFlow',
        color: 'cyan',
        desc: 'Conflict resolution for distributed offline edits (manager vs resident updates)',
      },
    ],
  },
  {
    number: '2.4',
    title: 'Split Brain & Fencing Tokens',
    brief: 'Prevent divergence when partitions occur. Fencing prevents stale leaders from acting.',
    priority: 'Critical',
    projects: [
      {
        name: 'RentFlow',
        color: 'cyan',
        desc: 'Booking system: fencing token prevents stale primary from double-booking same room',
      },
      {
        name: 'Zentra',
        color: 'purple',
        desc: 'Token revocation: epoch-based token invalidation prevents split-brain token acceptance',
      },
    ],
  },
  {
    number: '2.5',
    title: 'Quorum Reads & Writes',
    brief: 'Trade consistency vs availability by requiring quorum agreement',
    priority: 'High',
    projects: [
      {
        name: 'RentFlow',
        color: 'cyan',
        desc: 'Payment data: require 2 of 3 replicas to confirm write before returning success',
      },
    ],
  },
  {
    number: '2.6',
    title: 'Heartbeat & Failure Detection',
    brief: 'Detect failed nodes via regular pings or gossip',
    priority: 'Critical',
    projects: [
      {
        name: 'All Products',
        color: 'secondary',
        desc: 'Railway health checks detect dead API instances. Zentra auth failure detection. CatchMoment worker liveness',
      },
    ],
  },
  {
    number: '2.7',
    title: 'Phi Accrual Failure Detector',
    brief: 'Probabilistic failure detection based on historical heartbeat patterns',
    priority: 'Medium',
    projects: [
      {
        name: 'Platform',
        color: 'secondary',
        desc: 'Replace binary healthy/unhealthy with probability scores for better failover decisions',
      },
    ],
  },
  {
    number: '2.8',
    title: 'Write-Ahead Log (WAL)',
    brief: 'Log all operations before applying to state. Enables crash recovery.',
    priority: 'Critical',
    projects: [
      {
        name: 'PostgreSQL',
        color: 'secondary',
        desc: 'WAL enables safe crash recovery, replication, logical decoding (Debezium CDC)',
      },
    ],
  },
];

// ════════════════════════════════════════════════════════════════════════════════
// SECTION 3: DATA & STORAGE SYSTEMS (14 CONCEPTS)
// ════════════════════════════════════════════════════════════════════════════════

const dataStorageCards: Card[] = [
  {
    icon: '🔀',
    title: 'Data Partitioning (Sharding)',
    category: 'SCALING STORAGE',
    description:
      'Horizontal: split rows across DBs by key range or hash. Vertical: split tables by column (frequently vs infrequently accessed). Directory-based: lookup table maps keys to shards. Problems: cross-shard joins, referential integrity, rebalancing hotspots.',
    fbtApplication:
      'RentFlow multi-tenancy = logical sharding by tenantId. Already implemented via PostgreSQL Row-Level Security. Physical sharding needed when single PG instance becomes bottleneck — use tenantId hash → DB routing layer.',
    pills: [
      { label: 'tenantId sharding', variant: 'primary' },
      { label: 'RLS', variant: 'secondary' },
      { label: 'Hash partitioning', variant: 'secondary' },
    ],
    accent: 'lime',
  },
  {
    icon: '📚',
    title: 'Database Replication Strategies',
    category: 'HIGH AVAILABILITY',
    description:
      'Synchronous: strong consistency, higher latency. Asynchronous: lower latency, possible data loss on failure. Semi-synchronous: wait for at least one replica. Statement-based vs Row-based vs Mixed replication in PostgreSQL (WAL shipping).',
    fbtApplication:
      'RentFlow: Railway managed PostgreSQL with async replica for reads. 90% of property listing queries go to replica. Write goes to primary. Connection string routing via .NET EF Core interceptor or PgBouncer.',
    pills: [
      { label: 'PG Replication', variant: 'primary' },
      { label: 'Read Replica', variant: 'secondary' },
      { label: 'PgBouncer', variant: 'secondary' },
    ],
    accent: 'cyan',
  },
  {
    icon: '🕒',
    title: 'Temporal Tables & Event Sourcing',
    category: 'AUDIT & HISTORY',
    description:
      'System-versioned temporal tables track full row history. Event sourcing stores state as sequence of events. Temporal queries with AS OF SYSTEM TIME. Bi-temporal: valid time + transaction time. PostgreSQL temporal table support (system-period).',
    fbtApplication:
      'RentFlow rent payment history = event sourcing candidate (PaymentCreated, PaymentFailed, RefundIssued). Temporal tables for property occupancy history (who lived in Room 4B, when). Zentra audit log is event sourced by design.',
    pills: [
      { label: 'Event Sourcing', variant: 'primary' },
      { label: 'Zentra Audit', variant: 'sky' },
      { label: 'Bi-temporal', variant: 'secondary' },
    ],
    accent: 'amber',
  },
  {
    icon: '🔍',
    title: 'Search Systems (Inverted Index)',
    category: 'SEARCH & DISCOVERY',
    description:
      'Inverted index maps terms → document IDs. Elasticsearch/OpenSearch builds inverted indexes. BM25 ranking algorithm. Tokenization, stemming, stop words. Vector search (dense retrieval) for semantic similarity. Hybrid search: keyword + vector.',
    fbtApplication:
      'RentFlow property search: PostgreSQL GIN index + pg_trgm for fuzzy matching. CatchMoment video search: Qdrant vector search for "find moments like this". EduConnect: semantic course search via Qdrant. Future: hybrid search across all FBT products.',
    pills: [
      { label: 'Qdrant Cloud', variant: 'cyan' },
      { label: 'pg_trgm', variant: 'primary' },
      { label: 'Vector Search', variant: 'amber' },
      { label: 'BM25', variant: 'secondary' },
    ],
    accent: 'pink',
  },
  {
    icon: '🗂️',
    title: 'Object Storage Architecture',
    category: 'BLOB / MEDIA',
    description:
      'Flat namespace key-value for large unstructured objects. S3-compatible APIs. Presigned URLs for secure direct uploads. Multipart upload for large files (>5GB). Object lifecycle policies. S3 Intelligent-Tiering for cost optimization.',
    fbtApplication:
      'CatchMoment: AWS S3 Mumbai for raw video uploads (presigned URL upload). BunnyCDN as pull-through CDN over S3. Multipart upload for events with 4K video. RentFlow: S3 for document storage (lease agreements, ID proofs). FIROSE: Product images on S3 + BunnyCDN.',
    pills: [
      { label: 'AWS S3 Mumbai', variant: 'cyan' },
      { label: 'BunnyCDN', variant: 'amber' },
      { label: 'Presigned URLs', variant: 'secondary' },
      { label: 'Multipart', variant: 'secondary' },
    ],
    accent: 'purple',
  },
  {
    icon: '📊',
    title: 'Time-Series Databases',
    category: 'METRICS & IOT',
    description:
      'Optimized for time-stamped sequential data. TimescaleDB (PostgreSQL extension), InfluxDB, Prometheus. Automatic time-based partitioning. Downsampling for retention. Continuous aggregates for real-time dashboards. Ideal for metrics, IoT, financial ticks.',
    fbtApplication:
      'RentFlow usage metrics (daily rent collection, occupancy rates over time) → TimescaleDB or ClickHouse. CatchMoment video processing metrics (queue depth, GPU utilization over time). Future: smart property IoT (electricity/water usage meters).',
    pills: [
      { label: 'TimescaleDB', variant: 'primary' },
      { label: 'ClickHouse', variant: 'secondary' },
      { label: 'IoT Future', variant: 'cyan' },
    ],
    accent: 'sky',
  },
  {
    icon: '🔄',
    title: 'Change Data Capture (CDC)',
    category: 'DATA STREAMING',
    description:
      'Capture DB changes as a stream of events. Debezium reads PostgreSQL WAL and produces Kafka events. Enables event-driven architectures without modifying application code. Use cases: search index updates, cache invalidation, analytics pipelines, audit trails.',
    fbtApplication:
      'RentFlow: Debezium on PostgreSQL → Kafka → ElasticSearch for property search index auto-sync. Zentra: CDC on user/role changes → invalidate downstream caches. CatchMoment: video status changes stream to React Query clients via SSE (CDC → SSE gateway).',
    pills: [
      { label: 'Debezium', variant: 'primary' },
      { label: 'WAL Streaming', variant: 'secondary' },
      { label: 'Cache Invalidation', variant: 'amber' },
    ],
    accent: 'cyan',
  },
  {
    icon: '📈',
    title: 'Read Models & CQRS',
    category: 'QUERY SEPARATION',
    description:
      'Separate read and write models. Write model normalised for integrity. Read model denormalised for query performance. Projections rebuild read models from domain events. Eventual consistency between write and read sides. MediatR implements CQRS dispatch.',
    fbtApplication:
      'RentFlow already uses MediatR CQRS. Owner dashboard read model is a denormalised view of properties + rooms + occupancy + payments. Rebuild this projection from domain events rather than complex JOIN queries — massive performance win at scale.',
    pills: [
      { label: 'MediatR', variant: 'primary' },
      { label: 'Projections', variant: 'secondary' },
      { label: 'Eventual Consistency', variant: 'amber' },
    ],
    accent: 'green',
  },
];

// ════════════════════════════════════════════════════════════════════════════════
// SECTION 4: COMMUNICATION PATTERNS (10 PROTOCOLS)
// ════════════════════════════════════════════════════════════════════════════════

const communicationTable: TableData = {
  headers: ['Pattern', 'What', 'When to Use', 'FBT Usage', 'Projects'],
  rows: [
    {
      Pattern: 'REST / HTTP',
      What: 'Stateless resource-based API, JSON payloads, HTTP verbs',
      When: 'Public APIs, simple CRUD, browser clients',
      FBT: 'All FBT public APIs. RentFlow frontend → .NET 8 API. Zentra OAuth endpoints',
      Projects: 'All',
    },
    {
      Pattern: 'GraphQL',
      What: 'Query language — client specifies exact shape needed',
      When: 'Complex nested data, multiple clients with different needs',
      FBT: 'RentFlow mobile app could benefit — residents, managers, owners each need different data shapes from same entities',
      Projects: 'RentFlow Mobile',
    },
    {
      Pattern: 'gRPC',
      What: 'Binary protocol, Protocol Buffers, HTTP/2, strongly typed',
      When: 'Internal service-to-service, high throughput, streaming',
      FBT: 'CatchMoment: video processor → highlight engine internal call (10x faster than JSON REST). Future: RentFlow microservices internal comms',
      Projects: 'CatchMoment',
    },
    {
      Pattern: 'WebSockets',
      What: 'Full-duplex persistent connection, low latency bidirectional',
      When: 'Real-time: chat, live updates, collaborative editing',
      FBT: 'RentFlow: Live occupancy updates on owner dashboard (SignalR). CatchMoment: Live video processing progress to client. Future: EduConnect live classroom',
      Projects: 'RentFlow, CatchMoment',
    },
    {
      Pattern: 'Server-Sent Events',
      What: 'Server → client push, HTTP/1.1 compatible, unidirectional',
      When: 'Live feeds, notifications, status updates (read-heavy)',
      FBT: 'CatchMoment: Video processing status stream (upload → transcoding → AI → ready). RentFlow: Notification feed for new booking requests',
      Projects: 'CatchMoment, RentFlow',
    },
    {
      Pattern: 'Message Queues',
      What: 'Async decoupled communication via broker (RabbitMQ, Kafka, SQS)',
      When: 'Async processing, load leveling, decoupling, retries',
      FBT: 'RentFlow: Payment webhook processing via MassTransit (RabbitMQ). CatchMoment: Video job queue. FIROSE: Order processing from Neat & Fresh. All background jobs',
      Projects: 'All',
    },
    {
      Pattern: 'Event Streaming (Kafka)',
      What: 'Ordered, replayable, partitioned log of events',
      When: 'Event sourcing, CDC, audit trails, high-volume events',
      FBT: 'CatchMoment event stream: CameraFeedStarted → HighlightDetected → ProcessingComplete. Future: FBT-wide event bus as products scale',
      Projects: 'CatchMoment, Future',
    },
    {
      Pattern: 'Webhooks',
      What: 'HTTP callback — server pushes to client endpoint on event',
      When: 'Third-party integrations, payment callbacks, CMS events',
      FBT: 'Razorpay payment webhook → RentFlow. GitHub webhooks → FBT CI/CD. Temporal workflow completion webhooks → CatchMoment frontend',
      Projects: 'RentFlow, FIROSE',
    },
    {
      Pattern: 'tRPC',
      What: 'Type-safe RPC for TypeScript — no codegen, no schema',
      When: 'Full-stack TypeScript monorepos, Next.js + Node backend',
      FBT: 'RentFlow Next.js frontend → backend type-safe calls without REST overhead. Eliminates DTO sync issues between frontend and API layer',
      Projects: 'RentFlow FE',
    },
  ],
};

// ════════════════════════════════════════════════════════════════════════════════
// SECTION 5: RELIABILITY & RESILIENCE PATTERNS (12 PATTERNS)
// ════════════════════════════════════════════════════════════════════════════════

const reliabilityCards: Card[] = [
  {
    icon: '⚡',
    title: 'Circuit Breaker',
    category: 'FAULT TOLERANCE',
    description:
      'Three states: Closed (normal), Open (failing fast), Half-Open (testing recovery). Prevents cascade failures. Polly v8 in .NET 8 provides circuit breaker with resilience pipelines.',
    fbtApplication:
      'Zentra circuit breaker on Razorpay payment calls — if Razorpay is down, open circuit immediately instead of timing out 1000 concurrent resident payment requests. Polly ResiliencePipeline already in FBT standards.',
    pills: [
      { label: 'Polly v8', variant: 'primary' },
      { label: 'Open/Closed/Half-Open', variant: 'secondary' },
      { label: 'Razorpay', variant: 'amber' },
    ],
    accent: 'amber',
  },
  {
    icon: '🔄',
    title: 'Retry with Exponential Backoff + Jitter',
    category: 'TRANSIENT FAULTS',
    description:
      'Retry transient failures: 1s → 2s → 4s → 8s (exponential). Add random jitter to prevent thundering herd. Limit max retries and max delay. Polly: AddRetry() with DelayBackoffType.Exponential. Never retry on 4xx (client errors).',
    fbtApplication:
      'CatchMoment Modal GPU calls: retry up to 3x with exponential backoff — GPU cold starts can cause transient 503s. RentFlow SendGrid email: retry 2x. Zentra: no retry on 401 (auth failure), retry on 503 (service unavailable).',
    pills: [
      { label: 'Polly', variant: 'primary' },
      { label: 'Jitter', variant: 'secondary' },
      { label: 'Modal GPU', variant: 'cyan' },
    ],
    accent: 'cyan',
  },
  {
    icon: '🚧',
    title: 'Bulkhead Pattern',
    category: 'ISOLATION',
    description:
      'Isolate failures by compartmentalising resources. Separate thread pools for different services — if payment service is slow, it doesn\'t exhaust threads for the whole API. SemaphoreSlim in .NET. Connection pool sizing per downstream service.',
    fbtApplication:
      'RentFlow: Separate Polly bulkheads for (1) Razorpay, (2) SendGrid, (3) Zentra auth. If SendGrid goes down, it can\'t starve Razorpay connection pool. CatchMoment: GPU processing bulkhead separate from metadata API bulkhead.',
    pills: [
      { label: 'SemaphoreSlim', variant: 'primary' },
      { label: 'Thread pools', variant: 'secondary' },
      { label: 'Isolation', variant: 'secondary' },
    ],
    accent: 'purple',
  },
  {
    icon: '⏱️',
    title: 'Timeout & Deadline',
    category: 'TIME BOUNDS',
    description:
      'Never wait indefinitely. Timeouts prevent cascading hangs. CancellationToken in .NET. Deadline propagation through microservices (gRPC deadlines). Timeout should be < upstream timeout.',
    fbtApplication:
      'RentFlow API endpoint timeout: 30s for most operations, 5min for report generation. Database queries: 10s. Zentra token validation: 100ms (fail fast). CatchMoment S3 upload: 5min per multipart chunk.',
    pills: [
      { label: 'CancellationToken', variant: 'primary' },
      { label: 'Deadline propagation', variant: 'secondary' },
    ],
    accent: 'sky',
  },
  {
    icon: '🎯',
    title: 'Idempotency & Deduplication',
    category: 'DUPLICATE HANDLING',
    description:
      'Idempotent operations: same request multiple times = same result. Use idempotency keys (UUID) for retryable operations. Deduplication via request ID cache or database constraints.',
    fbtApplication:
      'RentFlow payments: Idempotency-Key header prevents double-charging if webhook retried. Zentra token refresh: single-flight mutex already implements idempotency. CatchMoment video upload: idempotency key prevents duplicate processing.',
    pills: [
      { label: 'Idempotency-Key', variant: 'primary' },
      { label: 'Deduplication', variant: 'secondary' },
      { label: 'Single-flight', variant: 'secondary' },
    ],
    accent: 'lime',
  },
  {
    icon: '📬',
    title: 'Dead Letter Queue (DLQ)',
    category: 'POISON PILL',
    description:
      'Messages that fail processing N times go to DLQ for investigation. Prevents infinite retry loops. Manual replay after fix. RabbitMQ dead-letter exchange, Kafka DLQ topic, SQS DLQ.',
    fbtApplication:
      'RentFlow: Failed payment webhooks → DLQ. Manual review + replay after fix. CatchMoment: Failed video processing jobs → DLQ. FIROSE: Order processing failures → DLQ for ops team to investigate.',
    pills: [
      { label: 'RabbitMQ DLX', variant: 'primary' },
      { label: 'Manual replay', variant: 'secondary' },
    ],
    accent: 'red',
  },
];

// ════════════════════════════════════════════════════════════════════════════════
// SECTION 6: SCALABILITY TECHNIQUES (10 STRATEGIES)
// ════════════════════════════════════════════════════════════════════════════════

const scalabilityTable: TableData = {
  headers: ['Technique', 'Mechanism', 'FBT Application', 'Priority'],
  rows: [
    {
      Technique: 'CDN',
      Mechanism:
        'Serve static assets from edge nodes closest to user. Pull-through or push CDN. Cache-Control headers control edge TTL.',
      FBT: 'FIROSE + CatchMoment: BunnyCDN in front of S3 Mumbai. All FBT Next.js apps: Vercel Edge Network. Media assets globally cached, origin hit only on miss.',
      Priority: 'Critical',
    },
    {
      Technique: 'Connection Pooling',
      Mechanism:
        'Reuse DB connections rather than creating per-request. PgBouncer for PostgreSQL. ADO.NET built-in pool for .NET.',
      FBT: 'All FBT .NET 8 services use built-in ADO.NET connection pool (max 100 connections per service). PgBouncer in front of Railway PostgreSQL for multi-instance RentFlow deployments.',
      Priority: 'Critical',
    },
    {
      Technique: 'Async Processing',
      Mechanism:
        'Offload slow operations to background workers. Message queues decouple producers from consumers.',
      FBT: 'RentFlow: All email sending, PDF generation, report exports → Hangfire background jobs. CatchMoment: Video processing via Temporal — never make user wait for video encoding.',
      Priority: 'Critical',
    },
    {
      Technique: 'Database Query Optimization',
      Mechanism:
        'EXPLAIN ANALYZE, N+1 elimination, index tuning, query hints, covering indexes.',
      FBT: 'RentFlow EF Core: Use Include() carefully, projection queries (Select DTO), AsNoTracking() for reads. Avoid N+1 on property→rooms→beds→residents chain queries.',
      Priority: 'High',
    },
    {
      Technique: 'Stateless Services',
      Mechanism:
        'No session state on server — enables horizontal scaling. Store session in Redis or JWT claims.',
      FBT: 'All FBT .NET APIs are stateless — JWT auth means no server-side session. Allows Railway to auto-scale from 1 to N instances without sticky sessions.',
      Priority: 'Critical',
    },
    {
      Technique: 'Database Connection Per-Tenant Routing',
      Mechanism:
        'Route queries to appropriate shard based on tenant. Middleware resolves tenant and selects connection string.',
      FBT: 'RentFlow multi-tenant: EF Core Tenant interceptor reads tenantId from JWT → sets RLS policy → all queries automatically scoped. Future: connection string routing to separate DB per enterprise tenant.',
      Priority: 'High',
    },
    {
      Technique: 'Pagination (Cursor-based)',
      Mechanism:
        'Never return unbounded result sets. Cursor-based for consistent results with live data. Offset-based for admin panels.',
      FBT: 'RentFlow property listings: Cursor-based pagination (createdAt + id). Zentra audit logs: Cursor pagination for compliance exports. CatchMoment video feed: Cursor on (eventId, timestamp). Never offset > 10,000 rows.',
      Priority: 'Critical',
    },
    {
      Technique: 'Materialized Views',
      Mechanism:
        'Pre-computed query results stored as a table. Refreshed periodically or on-demand. Avoids expensive joins at query time.',
      FBT: 'RentFlow owner dashboard stats (total revenue, occupancy rate, pending dues) — materialized view refreshed every 5 minutes. Huge performance win vs computing from raw tables on every dashboard load.',
      Priority: 'High',
    },
    {
      Technique: 'Batch Processing',
      Mechanism:
        'Process records in bulk rather than one-by-one. Bulk INSERT/UPDATE. LINQ batch operations via EF Core Extensions.',
      FBT: 'RentFlow monthly rent generation: Batch INSERT all rent_dues for all tenants in one transaction (not N individual INSERTs). CatchMoment: Batch video metadata updates after processing pipeline completes.',
      Priority: 'High',
    },
    {
      Technique: 'Lazy Loading (Application Layer)',
      Mechanism:
        'Load data only when needed. Defer expensive operations. Load plugins on demand (relates to plugin architecture).',
      FBT: 'RentFlow: Load property images lazily (thumbnail first, full gallery on expand). CatchMoment: Load video chunks on scroll (infinite feed). Next.js next/dynamic for heavy chart components in dashboards.',
      Priority: 'High',
    },
  ],
};

// ════════════════════════════════════════════════════════════════════════════════
// SECTION 7: SECURITY & AUTHENTICATION (8 PATTERNS)
// ════════════════════════════════════════════════════════════════════════════════

const securityCards: Card[] = [
  {
    icon: '🔐',
    title: 'OAuth 2.0 / OIDC',
    category: 'IDENTITY',
    description:
      'Authorization Code + PKCE for web/mobile. Client Credentials for M2M. Implicit flow deprecated. OIDC adds identity layer (ID token) over OAuth 2.0 (access token). Refresh token rotation prevents token theft replay.',
    fbtApplication:
      'Zentra IS this. FBT built a complete OAuth 2.0 / OIDC provider. All FBT products (RentFlow, CatchMoment, FIROSE apps) use Zentra as their identity provider. The refresh token race condition you fixed with single-flight mutex is directly from this section.',
    pills: [
      { label: 'Zentra Core', variant: 'sky' },
      { label: 'PKCE', variant: 'secondary' },
      { label: 'Refresh Rotation', variant: 'secondary' },
    ],
    accent: 'lime',
  },
  {
    icon: '🎯',
    title: 'RBAC & ABAC',
    category: 'AUTHORIZATION',
    description:
      'RBAC: roles define permissions (Owner can read/write properties, Resident can read only). ABAC: attribute-based (owner can only see their own properties). Policy-based authorization in .NET. Claims in JWT encode roles. Claim-based access control.',
    fbtApplication:
      'Zentra manages roles: SuperAdmin, PGOwner, Manager, Resident. RentFlow enforces ABAC: Owners can only manage properties they own (attribute: ownerId = current user). .NET Policy: RequireClaim("rentflow:manage:property"). RemoveRoleClaimsHandler handles role changes.',
    pills: [
      { label: 'Zentra Roles', variant: 'sky' },
      { label: 'RentFlow ABAC', variant: 'primary' },
      { label: 'Claims-based', variant: 'secondary' },
    ],
    accent: 'amber',
  },
  {
    icon: '🛡️',
    title: 'API Key Management',
    category: 'M2M AUTH',
    description:
      'API keys for machine-to-machine auth. Hash keys before storing (PBKDF2 or bcrypt). Key prefix for identification (sk_live_, pk_test_). Scoped permissions per key. Key rotation without downtime. Rate limit per key. Never store plaintext keys.',
    fbtApplication:
      'Zentra API Resources section manages API keys for FBT internal services. RentFlow backend calls Zentra with a service API key (not user token). CatchMoment\'s Modal GPU calls use Anthropic/Modal API keys managed through Zentra\'s secret management (not hardcoded).',
    pills: [
      { label: 'Zentra API Keys', variant: 'sky' },
      { label: 'PBKDF2 hash', variant: 'secondary' },
      { label: 'Scoped perms', variant: 'secondary' },
    ],
    accent: 'red',
  },
  {
    icon: '🔒',
    title: 'Zero Trust Architecture',
    category: 'NETWORK SECURITY',
    description:
      'Never trust, always verify. Verify every request regardless of network origin. mTLS for service-to-service. Least privilege access. Micro-segmentation. Identity is the new perimeter. Assume breach mentality — design for compromise containment.',
    fbtApplication:
      'Vyxnos Shield is FBT\'s zero-trust API gateway project. VIRV scoring, Policy Genome, Synaptic Router are FBT\'s custom zero-trust components. All RentFlow internal service calls go through Zentra token verification — even internal. mTLS between CatchMoment microservices.',
    pills: [
      { label: 'Vyxnos Shield', variant: 'primary' },
      { label: 'mTLS', variant: 'secondary' },
      { label: 'Least privilege', variant: 'secondary' },
    ],
    accent: 'cyan',
  },
  {
    icon: '🔑',
    title: 'Secrets Management',
    category: 'CREDENTIALS',
    description:
      'Never store secrets in code or environment variables in source control. HashiCorp Vault, AWS Secrets Manager, Azure Key Vault. Secret rotation without redeployment. Secret versioning. Injection at runtime via sidecar or SDK. Audit access to secrets.',
    fbtApplication:
      'RentFlow: Railway environment variables (encrypted at rest). Production: migrate to AWS Secrets Manager for rotation. Zentra manages signing keys for JWTs — rotate quarterly. CatchMoment: Modal API key, AWS S3 credentials via Railway secrets. @t3-oss/env-nextjs validates at build time.',
    pills: [
      { label: 'Railway Secrets', variant: 'primary' },
      { label: 'AWS SM', variant: 'secondary' },
      { label: 'Key Rotation', variant: 'amber' },
    ],
    accent: 'pink',
  },
  {
    icon: '🚫',
    title: 'Input Validation & OWASP Top 10',
    category: 'APPLICATION SECURITY',
    description:
      'OWASP Top 10: Injection, Broken Auth, XSS, IDOR, Security Misconfiguration, Vulnerable Components, etc. Parameterized queries prevent SQL injection. Server-side validation always (never trust client). CSP headers prevent XSS. CORS policy enforcement.',
    fbtApplication:
      'All FBT .NET APIs: FluentValidation server-side on every command handler. EF Core parameterized queries prevent SQLi. Next.js CSP headers configured in next.config.ts. Zentra: PKCE prevents auth code interception (OWASP ASVS L2). No dangerouslySetInnerHTML in React.',
    pills: [
      { label: 'FluentValidation', variant: 'primary' },
      { label: 'OWASP', variant: 'secondary' },
      { label: 'CSP', variant: 'secondary' },
      { label: 'PKCE', variant: 'secondary' },
    ],
    accent: 'purple',
  },
];

// ════════════════════════════════════════════════════════════════════════════════
// SECTION 8: OBSERVABILITY & MONITORING (7 PILLARS)
// ════════════════════════════════════════════════════════════════════════════════

const observabilityCards: Card[] = [
  {
    icon: '📝',
    title: 'Structured Logging',
    category: 'PILLAR 1',
    description:
      'JSON-formatted logs with consistent fields. Correlation ID threads through all services for request tracing. Log levels: Trace → Debug → Info → Warn → Error → Fatal. Log sampling at high volume. Centralized aggregation (Seq, Loki, CloudWatch).',
    fbtApplication:
      'Serilog + Seq for all .NET 8 services. Every log includes: tenantId, userId, correlationId, requestId. structlog for any Python services (CatchMoment AI). tracing crate in Rust (Vyxnos Shield). OpenTelemetry log bridge for unified collection.',
    pills: [
      { label: 'Serilog', variant: 'primary' },
      { label: 'Seq', variant: 'secondary' },
      { label: 'Correlation ID', variant: 'secondary' },
      { label: 'JSON logs', variant: 'secondary' },
    ],
    accent: 'lime',
  },
  {
    icon: '📊',
    title: 'Distributed Tracing',
    category: 'PILLAR 2',
    description:
      'Track a single request across multiple services. TraceId + SpanId + ParentSpanId. W3C Trace Context standard. Jaeger, Zipkin, Honeycomb, Tempo as backends. OpenTelemetry SDK for instrumentation. Sampling: head-based vs tail-based.',
    fbtApplication:
      'OpenTelemetry SDK in all .NET 8 services. Trace: RentFlow API → Zentra Auth → Payment → DB. See exact span where latency occurs. CatchMoment: Trace video upload → S3 → Temporal → Modal GPU → highlight generation. Grafana Tempo as backend.',
    pills: [
      { label: 'OpenTelemetry', variant: 'primary' },
      { label: 'Grafana Tempo', variant: 'secondary' },
      { label: 'TraceId propagation', variant: 'secondary' },
    ],
    accent: 'cyan',
  },
  {
    icon: '📈',
    title: 'Metrics (RED + USE)',
    category: 'PILLAR 3',
    description:
      'RED: Rate, Errors, Duration (for services). USE: Utilization, Saturation, Errors (for resources). Prometheus for collection. Grafana for dashboards. Counters, Gauges, Histograms, Summaries. SLI/SLO/SLA definitions. Alert on SLO breach, not individual errors.',
    fbtApplication:
      'System.Diagnostics.Metrics (.NET 8) + OpenTelemetry Metrics → Prometheus → Grafana. Key FBT metrics: RentFlow booking conversion rate, Zentra token issuance rate, CatchMoment video processing P95 latency, GPU utilization on Modal.',
    pills: [
      { label: 'Prometheus', variant: 'primary' },
      { label: 'Grafana', variant: 'secondary' },
      { label: 'RED/USE', variant: 'secondary' },
      { label: 'SLO alerts', variant: 'amber' },
    ],
    accent: 'amber',
  },
  {
    icon: '🚨',
    title: 'Alerting & SLO/SLI/SLA',
    category: 'RELIABILITY',
    description:
      'SLI: actual measurement (P99 latency = 180ms). SLO: target (P99 latency ≤ 200ms). SLA: contract with consequences. Error budget: how much SLO slack before burning budget. Alert on symptom (user-facing degradation), not cause (CPU spike).',
    fbtApplication:
      'RentFlow: SLO — 99.9% availability, P99 API latency ≤500ms, booking success rate ≥99.5%. Zentra: SLO — token issuance P99 ≤100ms, 99.95% availability. CatchMoment: SLO — video ready within 2min of upload P95. Alert via PagerDuty or Slack.',
    pills: [
      { label: 'Error Budget', variant: 'primary' },
      { label: 'PagerDuty', variant: 'secondary' },
      { label: 'Zentra SLO', variant: 'sky' },
    ],
    accent: 'purple',
  },
];

// ════════════════════════════════════════════════════════════════════════════════
// SECTION 9: CLASSIC SYSTEM DESIGNS → FBT ANALOGS (18 DESIGNS)
// ════════════════════════════════════════════════════════════════════════════════

const designProblemsCards: Card[] = [
  {
    icon: '🔗',
    title: 'URL Shortener',
    category: 'HASH + REDIRECT',
    description:
      'Base62 encoding, hash collision handling, redirect at CDN edge, analytics tracking',
    fbtApplication:
      'RentFlow QR codes for property self-check-in + referral links',
    accent: 'lime',
  },
  {
    icon: '📄',
    title: 'Pastebin',
    category: 'CONTENT STORE',
    description:
      'Content-addressed storage, expiry, read-heavy caching, shareable links',
    fbtApplication:
      'RentFlow notice board, CatchMoment event brief sharing',
    accent: 'cyan',
  },
  {
    icon: '📸',
    title: 'Instagram',
    category: 'MEDIA + SOCIAL',
    description:
      'Photo CDN, news feed ranking, push vs pull, follow graph, image resizing',
    fbtApplication:
      'CatchMoment event gallery, FIROSE product catalog',
    accent: 'pink',
  },
  {
    icon: '📁',
    title: 'Dropbox',
    category: 'FILE SYNC',
    description:
      'Chunked upload, content dedup, sync engine, conflict resolution, offline support',
    fbtApplication:
      'RentFlow document management (leases, IDs, receipts)',
    accent: 'purple',
  },
  {
    icon: '💬',
    title: 'Facebook Messenger',
    category: 'REAL-TIME MESSAGING',
    description:
      'WebSocket, message ordering, delivery receipts, offline queue, push notifications',
    fbtApplication:
      'RentFlow resident ↔ manager communication',
    accent: 'amber',
  },
  {
    icon: '🐦',
    title: 'Twitter',
    category: 'SOCIAL GRAPH + FEED',
    description:
      'Fan-out on write, Redis sorted sets for timeline, trending, search indexing',
    fbtApplication:
      'EduConnect student activity feed, FIROSE brand updates',
    accent: 'lime',
  },
  {
    icon: '▶️',
    title: 'YouTube / Netflix',
    category: 'VIDEO STREAMING',
    description:
      'HLS/DASH, transcoding pipeline, CDN multi-tier, adaptive bitrate, recommendation',
    fbtApplication:
      'CatchMoment — core architecture mirror',
    accent: 'red',
  },
  {
    icon: '🔤',
    title: 'Typeahead',
    category: 'SEARCH UX',
    description:
      'Trie or Elasticsearch prefix, popularity ranking, debounce, cache suggestions',
    fbtApplication:
      'RentFlow property search, EduConnect course search',
    accent: 'sky',
  },
  {
    icon: '🚦',
    title: 'Rate Limiter',
    category: 'PROTECTION',
    description:
      'Token Bucket, Sliding Window, Redis atomic ops, distributed coordination',
    fbtApplication:
      'Zentra auth endpoints, all FBT public APIs',
    accent: 'lime',
  },
  {
    icon: '🗺️',
    title: 'Yelp / Proximity',
    category: 'GEO SEARCH',
    description:
      'GeoHash, QuadTree, PostGIS, radius search, map tile caching',
    fbtApplication:
      'RentFlow "PGs near me", maintenance dispatch routing',
    accent: 'purple',
  },
  {
    icon: '🚕',
    title: 'Uber / Lyft',
    category: 'DISPATCH SYSTEM',
    description:
      'Location streaming, nearest-N, matching, surge pricing, ETA',
    fbtApplication:
      'RentFlow maintenance crew dispatch to PGs',
    accent: 'amber',
  },
  {
    icon: '🎟️',
    title: 'Ticketmaster',
    category: 'CONCURRENT BOOKING',
    description:
      'Pessimistic locking, reservation expiry, atomic saga, overbooking prevention',
    fbtApplication:
      'RentFlow bed booking concurrency — identical problem',
    accent: 'cyan',
  },
];

// ════════════════════════════════════════════════════════════════════════════════
// SECTION 10: FBT PROJECT SYSTEM DESIGN MAP
// ════════════════════════════════════════════════════════════════════════════════

const fbtMappingSections = [
  {
    id: 'rentflow-arch',
    number: 'RF',
    title: 'RentFlow — Complete System Architecture',
    brief: 'PG/co-living SaaS — multi-tenant rental platform',
    priority: 'Primary Product',
    color: 'cyan',
    architecture: `┌─────────────────────────────────────────────────────────────────┐
│                         RENTFLOW SYSTEM                          │
├─────────────────────────────────────────────────────────────────┤
│  [Next.js 15 Web]  [Expo Mobile]                                 │
│         │                 │                                       │
│         └─────────┬───────┘                                       │
│                   ▼                                               │
│         [Railway Load Balancer] ← Rate Limit (Sliding Window)    │
│                   │                                               │
│         [.NET 8 API — CQRS / MediatR / Clean Arch]               │
│          │        │        │        │                             │
│     [Zentra]  [Redis]  [PgBouncer] [Hangfire Jobs]               │
│     Auth/JWT  Cache    Connection   Background                    │
│                         Pool       Workers                        │
│                   │                                               │
│         [PostgreSQL Primary] → [Read Replica]                    │
│                   │                                               │
│         [Outbox Worker] → [RabbitMQ] → [MassTransit Consumers]   │
│                   │              │                                 │
│              [Email]      [Webhook]  [Push Notification]          │
│                   │                                               │
│           [S3 Mumbai] → [BunnyCDN] ← [Document uploads]          │
└─────────────────────────────────────────────────────────────────┘`,
    insights: [
      {
        title: 'Scalability Pattern',
        description:
          'Horizontal scaling via stateless .NET API pods. tenantId-scoped data via RLS. Read replicas for 90% read traffic on property listings',
      },
      {
        title: 'Consistency Model',
        description:
          'CP for financial data (payments, invoices). AP acceptable for notifications, activity feeds. Strong consistency for booking/reservation state',
      },
      {
        title: 'Booking Concurrency',
        description:
          'SELECT FOR UPDATE on bed/room row. Reservation holds for 10min with TTL. Saga: reserve → charge → confirm. Compensate on failure',
      },
      {
        title: 'Caching Strategy',
        description:
          'Redis cache-aside for property listings (5min TTL). Write-through for occupancy. Invalidate on booking, check-in, check-out events',
      },
    ],
  },
  {
    id: 'zentra-arch',
    number: 'ZT',
    title: 'Zentra — Identity Platform Architecture',
    brief: 'OAuth 2.0 / OIDC provider — shared identity for all FBT products',
    priority: 'Infrastructure',
    color: 'purple',
    architecture: `┌─────────────────────────────────────────────────────────────────┐
│                          ZENTRA                                  │
├─────────────────────────────────────────────────────────────────┤
│  [Client Apps] → [Authorization Endpoint] → [PKCE Flow]         │
│                          │                                       │
│               [Token Service] ← Redis Token Cache               │
│                    │       │                                      │
│            [JWT Signing]  [Refresh Token Store]                  │
│                    │         │ (Rotating, Redis)                  │
│                    ▼         ▼                                    │
│         [PostgreSQL: Users, Clients, Scopes, Roles]              │
│                    │                                              │
│         [Audit Log Stream] → [Event Sourced Audit Store]         │
│                    │                                              │
│         [Admin UI — Lazy-loaded Plugin Modules]                  │
│          Client Mgmt | Roles | Tokens | Users | Audit            │
└─────────────────────────────────────────────────────────────────┘`,
    insights: [
      {
        title: 'High Availability',
        description:
          'Active-passive failover. 99.95% SLO. Every FBT product depends on Zentra — single point of failure means ALL products down',
      },
      {
        title: 'Token Validation',
        description:
          'Bloom filter fast-path for revocation check. Redis for revoked JTI list. Local JWT validation without Zentra call for most requests',
      },
      {
        title: 'Rate Limiting',
        description:
          'Sliding Window: 10 auth attempts / 15min per IP. Account lockout after 5 failed attempts. CAPTCHA threshold at 3 failures',
      },
      {
        title: 'Refresh Token Race',
        description:
          'Single-flight mutex pattern (already implemented) prevents duplicate refresh on concurrent requests — fencing token approach',
      },
    ],
  },
  {
    id: 'catchmoment-arch',
    number: 'CM',
    title: 'CatchMoment — AI Video Platform Architecture',
    brief: 'Event video capture + AI highlight generation — 8-repo polyrepo',
    priority: 'Growing Product',
    color: 'pink',
    architecture: `┌─────────────────────────────────────────────────────────────────┐
│                       CATCHMOMENT                                │
├─────────────────────────────────────────────────────────────────┤
│  [Next.js Web] → Presigned URL → [S3 Mumbai] → Multipart Upload  │
│                                        │                         │
│                               [S3 Event Trigger]                 │
│                                        │                         │
│                         [Temporal Cloud Workflow]                 │
│                          ┌─────────────────────┐                 │
│                          │ 1. Validate Upload   │                 │
│                          │ 2. Transcode (Modal) │ ← HLS/DASH     │
│                          │ 3. AI Inference      │ ← GPU           │
│                          │ 4. Highlight Extract │                 │
│                          │ 5. Generate Thumbnail│                 │
│                          │ 6. Index in Qdrant   │ ← Vector Search │
│                          │ 7. Notify Client     │ ← SSE           │
│                          └─────────────────────┘                 │
│                                        │                         │
│                         [BunnyCDN] ← [S3 Processed Videos]       │
│                         HLS streaming to client                   │
└─────────────────────────────────────────────────────────────────┘`,
    insights: [
      {
        title: 'YouTube Lessons',
        description:
          'HLS adaptive bitrate streaming (360p / 720p / 1080p / 4K). Thumbnail at 5 intervals. Processing pipeline stages same as YouTube\'s architecture',
      },
      {
        title: 'Consistency Model',
        description:
          'AP for video metadata (eventual consistency). Processing status eventual via SSE. Video content immutable once processed',
      },
      {
        title: 'Saga Pattern',
        description:
          'Temporal orchestrates the full processing saga. Compensation: delete S3 artifacts on failure. At-least-once delivery with idempotency keys',
      },
      {
        title: 'Search Architecture',
        description:
          'Qdrant vector search for "find moments like this clip". Temporal workflow indexes embeddings after AI inference. Semantic video search',
      },
    ],
  },
];

// ════════════════════════════════════════════════════════════════════════════════
// SECTION 11: IMPLEMENTATION ROADMAP (PHASED PLAN)
// ════════════════════════════════════════════════════════════════════════════════

const roadmapPhases = [
  {
    quarter: 'Q1',
    phase: 'Immediate · All Projects',
    title: 'Foundation Hardening',
    description:
      'Bloom filter (Zentra), bulkheads (RentFlow), cursor pagination (all APIs), composite indexes (RentFlow DB), SLO definitions (all products), CSP headers (all frontends). These are small changes with massive reliability impact.',
    items: [
      {
        num: '01',
        text: 'Add Bloom filter to Zentra token revocation fast-path — 99% of valid tokens skip Redis lookup',
        tag: 'Day 1',
      },
      {
        num: '02',
        text: 'Implement Redis read replica for RentFlow property listing queries (huge read volume)',
        tag: 'Week 1',
      },
      {
        num: '03',
        text: 'Add Polly bulkheads for each external service (Razorpay, SendGrid, Zentra) in RentFlow',
        tag: 'Week 1',
      },
      {
        num: '04',
        text: 'Define SLOs for all FBT services (RentFlow 99.9%, Zentra 99.95%, CatchMoment 99.5%)',
        tag: 'Week 1',
      },
      {
        num: '05',
        text: 'Implement cursor-based pagination for all RentFlow list endpoints (replace offset pagination)',
        tag: 'Week 2',
      },
      {
        num: '06',
        text: 'Add composite indexes (tenantId, status, createdAt) to all RentFlow high-traffic tables',
        tag: 'Week 2',
      },
    ],
    tags: ['Zentra', 'RentFlow', 'Low risk', 'High impact'],
  },
  {
    quarter: 'Q2',
    phase: 'Month 1–2 · RentFlow Priority',
    title: 'Scalability & Observability',
    description:
      'OpenTelemetry distributed tracing, PostgreSQL read replica routing, materialized views for dashboards, booking saga with Temporal/MassTransit, rate limiting on Zentra. Start measuring before optimising.',
    items: [
      {
        num: '07',
        text: 'Set up OpenTelemetry distributed tracing across RentFlow → Zentra → DB for latency debugging',
        tag: 'Month 1',
      },
      {
        num: '08',
        text: 'Implement booking saga in RentFlow: ReserveBed → ProcessPayment → Confirm with Temporal or MassTransit SM',
        tag: 'Month 1',
      },
      {
        num: '09',
        text: 'Add Sliding Window rate limiting to Zentra auth endpoints via ASP.NET Core Rate Limiting middleware',
        tag: 'Month 1',
      },
      {
        num: '10',
        text: 'PostgreSQL materialized views for RentFlow owner dashboard stats (refresh every 5min via pg_cron)',
        tag: 'Month 2',
      },
      {
        num: '11',
        text: 'CatchMoment: HLS transcoding pipeline via FFmpeg on Modal — adaptive bitrate (360p/720p/1080p)',
        tag: 'Month 2',
      },
      {
        num: '12',
        text: 'Add Leader Election to RentFlow background job workers to prevent duplicate Hangfire job execution',
        tag: 'Month 2',
      },
    ],
    tags: ['Saga', 'Tracing', 'Read replicas', 'Rate limiting'],
  },
  {
    quarter: 'Q3',
    phase: 'Month 3–4 · CatchMoment Priority',
    title: 'CatchMoment Video Pipeline',
    description:
      'Full HLS transcoding via Modal, Qdrant vector search for semantic video search, Temporal multi-stage saga for processing, SSE progress streaming, BunnyCDN HLS delivery optimisation, DLQ for failed jobs.',
    items: [
      {
        num: '13',
        text: 'Complete Qdrant vector search integration for semantic video moment finding',
        tag: 'Month 3',
      },
      {
        num: '14',
        text: 'Implement Server-Sent Events (SSE) for real-time video processing progress to frontend',
        tag: 'Month 3',
      },
      {
        num: '15',
        text: 'Set up DLQ handling for failed video processing jobs with automated alerting',
        tag: 'Month 3',
      },
    ],
    tags: ['HLS', 'Qdrant', 'Temporal', 'SSE'],
  },
  {
    quarter: 'Q4',
    phase: 'Month 5–6 · Platform',
    title: 'FBT Platform Event Bus & Future Products',
    description:
      'Kafka event bus bridging RentFlow, Zentra, CatchMoment. Schema registry for event contracts. CDC from RentFlow PostgreSQL. Begin EduConnect system design. Vyxnos Shield zero-trust gateway hardening.',
    items: [
      {
        num: '16',
        text: 'Kafka event bus setup and cross-product event contract schema registry',
        tag: 'Month 5',
      },
      {
        num: '17',
        text: 'Enable CDC on RentFlow PostgreSQL for event streaming via Debezium',
        tag: 'Month 5',
      },
      {
        num: '18',
        text: 'EduConnect system design review against DesignGurus patterns (Typeahead + Twitter/Feed)',
        tag: 'Month 6',
      },
    ],
    tags: ['Kafka', 'CDC', 'Vyxnos', 'EduConnect'],
  },
];

// ════════════════════════════════════════════════════════════════════════════════
// COMPLETE SECTIONS ARRAY
// ════════════════════════════════════════════════════════════════════════════════

export const systemDesignSections: Section[] = [
  {
    id: 'foundations',
    title: 'System Design Foundations',
    module: 'MODULE 01',
    subtitle: '12 core concepts',
    description:
      'The bedrock of every system design decision. DesignGurus opens with these because everything else builds on them — scalability, reliability, availability, and the trade-offs between them.',
    type: 'cards',
    data: foundationsCards,
  },
  {
    id: 'distributed',
    title: 'Distributed Systems Concepts',
    module: 'MODULE 02',
    subtitle: '18 advanced patterns',
    description:
      'DesignGurus goes deep into the internals of how distributed systems maintain consensus, detect failures, and handle the realities of networks. These are the concepts that separate senior engineers from junior ones.',
    type: 'accordion',
    data: distributedAccordion,
  },
  {
    id: 'data-storage',
    title: 'Data & Storage Systems',
    module: 'MODULE 03',
    subtitle: '14 storage concepts',
    description:
      'Comprehensive coverage of data storage patterns, from partitioning and replication to search systems and event sourcing.',
    type: 'cards',
    data: dataStorageCards,
  },
  {
    id: 'communication',
    title: 'Communication Patterns',
    module: 'MODULE 04',
    subtitle: '10 protocols & patterns',
    description:
      'All the ways services talk to each other: REST, GraphQL, gRPC, WebSockets, SSE, message queues, and more.',
    type: 'table',
    data: communicationTable,
  },
  {
    id: 'reliability',
    title: 'Reliability & Resilience Patterns',
    module: 'MODULE 05',
    subtitle: '12 patterns',
    description:
      'Circuit breakers, retries, bulkheads, timeouts, idempotency, and dead letter queues — the patterns that keep systems standing.',
    type: 'cards',
    data: reliabilityCards,
  },
  {
    id: 'scalability',
    title: 'Scalability Techniques',
    module: 'MODULE 06',
    subtitle: '10 strategies',
    description:
      'CDNs, connection pooling, async processing, query optimization, stateless services, pagination, materialized views, and batch processing.',
    type: 'table',
    data: scalabilityTable,
  },
  {
    id: 'security-sd',
    title: 'Security & Authentication',
    module: 'MODULE 07',
    subtitle: '8 security patterns',
    description:
      'OAuth 2.0, OIDC, RBAC, ABAC, API keys, zero trust, secrets management, and OWASP Top 10 prevention.',
    type: 'cards',
    data: securityCards,
  },
  {
    id: 'observability',
    title: 'Observability & Monitoring',
    module: 'MODULE 08',
    subtitle: '7 pillars',
    description:
      'Structured logging, distributed tracing, metrics (RED/USE), alerting, SLO/SLI/SLA definitions.',
    type: 'cards',
    data: observabilityCards,
  },
  {
    id: 'design-problems',
    title: 'Classic System Designs → FBT Analogs',
    module: 'MODULE 09',
    subtitle: '18 design problems mapped',
    description:
      'DesignGurus walks through 18 classic system design interview problems. Each is directly analogous to something FBT is building or will build. Learn the pattern, apply to FBT.',
    type: 'cards',
    data: designProblemsCards,
  },
  {
    id: 'fbt-mapping',
    title: 'FBT Project System Design Map',
    module: 'MODULE 10',
    subtitle: 'complete architecture blueprint',
    description:
      'Treating every DesignGurus lesson as a direct specification for FBT\'s architecture. RentFlow = Ticketmaster + Uber + Messenger. CatchMoment = YouTube + Dropbox. Zentra = Auth0 architecture.',
    type: 'flow',
    data: fbtMappingSections,
  },
  {
    id: 'roadmap',
    title: 'FBT Implementation Roadmap',
    module: 'MODULE 11',
    subtitle: 'apply now · phased plan',
    description:
      'Apply these DesignGurus lessons immediately. Phased plan across Q1-Q4 for all FBT products.',
    type: 'flow',
    data: roadmapPhases,
  },
];
