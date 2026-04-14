export interface ArticleLink {
  label: string;
  url: string;
}

export interface CaptionedImage {
  src: string;
  caption: string;
}

export interface Project {
  title: string;
  subtitle: string;
  year: string;
  description: string;
  descLong: string;
  tags: string[];
  linkedinUrl?: string;
  videoUrl?: string;
  videoUrls?: string[];
  images?: string[];
  captionedImages?: CaptionedImage[];
  bannerPosition?: string;
  articleLinks?: ArticleLink[];
}

export const projects: Project[] = [
  {
    title: "Humanoid Robot Warehouse Automation",
    subtitle:
      "Unitree H1-2 · NVIDIA IsaacSim · IsaacLab · Imitation Learning · Reinforcement Learning · Gemini Robotics",
    year: "2026",
    description:
      "End-to-end pilot deploying a Unitree H1-2 humanoid robot to autonomously sort industrial cartons onto pallets — combining imitation learning, reinforcement learning, computer vision, and foundation model orchestration into a single hybrid policy architecture.",
    descLong: `Can a humanoid robot reliably pick up a box, walk across a warehouse floor, and put it down in the right place? It sounds simple. It is not simple.

The project was a pilot program with an industrial manufacturer to deploy a Unitree H1-2 humanoid robot to automate part of their warehouse workflow — specifically, sorting cartons onto pallets by product identifier. The kind of task a warehouse worker does hundreds of times a day without thinking. The kind of task that turns out to be extraordinarily hard to teach a robot to do reliably.

Before the robot ever touched a real box, we built a digital twin — a full simulation environment in NVIDIA IsaacSim modeling the warehouse floor, pallets, cartons, and robot itself with enough fidelity to run training cycles without physical trials. The problem is that simulation is a lie you tell yourself until the real world corrects you. The fidelity gap between simulated physics and actual factory floor conditions proved to be one of the most significant technical challenges of the project. Surface friction, carton weight distribution, the way a box shifts when fingers close around it, the way label lighting changes depending on robot position — none of these are impossible to model, and all of them are harder to model accurately than you expect.

Rather than converging on a single learning methodology, the team conducted structured discovery across four distinct approaches: reinforcement learning, imitation learning, foundation model orchestration, and traditional SDK control. Pure reinforcement learning struggled with the long-horizon problem — when a task involves many sequential steps, the rewards signal becomes too sparse and delayed for stable training. Imitation learning, where a human teleoperates the robot in simulation via NVIDIA XR and Apple Vision Pro to record demonstration trajectories, produced significantly better results and got us a working pick-and-place policy in IsaacLab. But imitation learning is brittle outside its training distribution — a box at a slightly different angle and confidence drops fast. Foundation model orchestration via Google Gemini Robotics showed real promise for task sequencing but wasn't ready to drive physical manipulation directly. SDK control was reliable for deterministic subtasks like navigation and label reading but not flexible enough for manipulation.

The architecture we landed on combines imitation learning and reinforcement learning, each doing what it is actually good at. Imitation learning governs approach posture and hand positioning — the motion quality and naturalness comes from replaying and refining human-demonstrated trajectories. Reinforcement learning governs grip force and in-hand adjustment during carry — adapting to weight variation, compensating for shift during walking, maintaining hold through turns. Getting to this architecture required working through and ruling out the alternatives first. That process took longer than planned and was also genuinely necessary.

On the computer vision side, I developed models for 3D box localization to identify carton position and coordinates for pickup, label OCR to read product and lot identifiers from carton labels, pickup confirmation to verify secure grip, and landing zone detection to identify correct pallet placement position.

The hardware reality added its own layer of complexity. The H1-2 battery tabs failed repeatedly under normal use — we disassembled the batteries, designed a replacement tab, and 3D-printed a fix. A more significant issue emerged when the robot stopped correctly entering damping mode on boot, blocking all physical lab testing while we worked through wiring configurations, firmware updates, and coordination with the manufacturer's distributor for replacement hardware. This is what working at the edge of a technology looks like: the simulation environment is sophisticated, the robot is capable, and then a battery tab breaks and you are printing replacement parts in the lab.

A meaningful portion of the most useful technical guidance on this project came not from product documentation but from PhD dissertations, university lab repositories, and academic papers on sim-to-real transfer, whole-body locomotion, and imitation learning policy architecture. Translating research-grade material into production-viable implementation is its own discipline, and one the team developed in real time. We built an internal knowledge base of verified system behaviors, integration quirks, and curated research references as we went.

The technical stack included the Unitree H1-2 and SDK2, NVIDIA IsaacSim and IsaacLab, AWS EC2 with NVIDIA AMI for cloud-based training, Google Gemini Robotics-ER for foundation model orchestration, ROS2 for sensor integration, Livox-SDK2 for LiDAR, and Inspire Hands with custom SDK integration for dexterous grasping.

The robot will pick up a box, walk across a warehouse floor, and put it down in the right place. That outcome is not in question. The honest account of getting there is that it is harder than it looks, slower than any timeline predicts, and more dependent on academic research than any product brochure suggests — and that the gap between simulation and deployment is exactly where the most interesting engineering happens.`,
    tags: ["Humanoid Robotics", "Imitation Learning", "Reinforcement Learning", "Computer Vision", "NVIDIA IsaacLab"],
    videoUrl: "/media/sim.mp4",
    videoUrls: ["/media/sim.mp4", "/media/wave.mp4"],
    images: ["/media/humanoid.jpeg"],
    bannerPosition: "top",
  },
  {
    title: "Boston Dynamics SPOT Inspection",
    subtitle: "Hitachi Rail · Slalom · Ericsson Private 5G · Lumada AI",
    year: "2025",
    description:
      "Automated quality inspection pipeline combining the SPOT robotic dog, private 5G connectivity, and Hitachi Lumada industrial AI to ensure passenger safety across rail manufacturing lines.",
    descLong: `What does the factory of the future actually look like? At a major rail manufacturer's advanced production facility, we built the answer.

We partnered with the client to automate quality inspections on their train car manufacturing line using the Boston Dynamics Spot robot, industrial AI, and private 5G — replacing manual inspection processes that were slow, inconsistent, and exposed workers to unnecessary risk on the factory floor.

Starting with a proof-of-concept at the client's R&D lab in California, we rapidly deployed a fleet of Spot robots at their East Coast advanced rail factory. The implementation covered robot configuration, private 5G network setup, and full integration with existing manufacturing systems to enable real-time automated inspections at scale. We also trained the client's engineering team to own and operate the solution independently after handoff.

The pipeline I built had five distinct layers, each handing off to the next.

The first was image capture — Spot's onboard camera triggered image acquisition on a scheduled inspection cycle, orchestrated by a Python layer I wrote that managed capture timing and queued images for downstream processing.

The second was inference — each image was sent to Gemini via the vision API with a structured prompt specifying defect types to look for: scratch, dent, surface irregularity. The model returned structured output including defect present or not, classification, bounding box coordinates, and a confidence score.

The third was decision logic — a Python layer parsed the model output and applied business rules. High-confidence detections above a defined threshold triggered an automatic pass or fail. Low-confidence outputs were routed to a human review queue rather than making an autonomous call.

The fourth was alerting — confirmed defects triggered downstream actions based on severity: flagging the part in the production system, notifying a quality control engineer, or halting the line entirely.

The fifth was logging — every inspection run wrote a full record to a database including the image reference, model output, confidence score, decision made, and whether it went to human review. That gave the client a complete audit trail and the data foundation for ongoing model evaluation.

The technical stack brought together Boston Dynamics Spot SDK and APIs for robot control, Nvidia Jetson Xavier for on-device edge compute, Microsoft Azure for cloud integration, Docker for containerized deployment, and Ericsson Private 5G to deliver the low-latency connectivity that real-time inspection data demands. The solution ran through Slalom's Element Lab innovation pipeline — from rapid prototyping and POC through to production deployment as a Robotics-as-a-Service model.

The outcome was that defect identification that previously required manual visual inspection got fully automated — reducing the time from production to quality flag significantly, improving worker safety, and giving the client complete traceability across the manufacturing line.`,
    tags: ["Robotics", "Industrial AI", "Private 5G", "Computer Vision"],
    linkedinUrl: "https://www.linkedin.com/posts/stevesaundersmbe_...",
    images: ["/media/spot-1.webp", "/media/spot-2.jpg", "/media/spot-3.jpeg"],
    captionedImages: [
      { src: "/media/teleop-dash.png", caption: "SPOT Mission Control Dashboard — teleoperation interface used to monitor and control robot deployment across the rail factory floor." },
      { src: "/media/mission-dash.png", caption: "SPOT Mission Control Dashboard — inspection run overview showing live robot status, zone coverage, and defect detection queue." },
    ],
    articleLinks: [
      {
        label: "Ericsson: Smart Factory Inspections with Private 5G",
        url: "https://www.ericsson.com/en/blog/2024/6/smart-factory-inspections-with-private-5g",
      },
      {
        label: "Hitachi Rail: Private 5G Network at Digital Factory",
        url: "https://www.hitachi.com/en-ca/press/globallogic-and-ericsson-deploy-private-5g-network-at-hitachi-rails-digital-factory/",
      },
    ],
  },
    {
    title: "AR Personality Recognition",
    subtitle:
      "Unity · AWS Rekognition · AWS Bedrock · Magic Leap 2 · Ericsson Private 5G · DISC Profiling",
    year: "2024",
    description:
      "Wearable AR app using facial recognition and a Bedrock-powered agentic pipeline to generate and surface DISC personality profiles in real time — built as an ethics conversation starter for enterprise clients at Slalom's Innovation Lab.",
    descLong: `We've all been there — at a networking event, knowing nobody, blanking on someone's name. Mingle Master 3000 was built to solve exactly that, and then push the question much further.

Using Unity as the AR development environment, I integrated AWS Rekognition for real-time facial recognition and AWS Bedrock to power an AI agentic pipeline that ingested pre-registered LinkedIn profiles and generated a DISC personality assessment from the profile data. The resulting profile — personality type, core traits, and communication recommendations — was then surfaced as a live overlay directly on the person's face through Magic Leap 2 wearable glasses. When you look at someone, the headset identifies them, retrieves their Bedrock-generated DISC profile, and renders it floating in your field of view in real time, powered by Ericsson private 5G for the low-latency compute pipeline.

But the deeper point wasn't the networking hack. It was the wake-up call. The same data pipeline that tells you how to open a conversation with a stranger is the same one a retailer could use to personalize your in-store experience before you say a word, a healthcare provider could use to tailor bedside manner in real time, or an employer could use to profile candidates before an interview begins. The data already exists — latent across LinkedIn profiles, public records, and social platforms. Mingle Master 3000 just made it visible, and uncomfortable, in a way a dashboard never could.

The demo ran across industries including retail, healthcare, manufacturing, and public sector — each surfacing the same core question from a different angle: where do we want this capability, and where should it never go? Participants registered through a consent kiosk before interacting, and opt-outs were frequent and intentional — each one opening its own conversation about data visibility, digital privacy, and what responsible deployment actually looks like in practice.

As spatial computing evolves and wearable devices get smaller and more ubiquitous, the gap between latent data and lived experience will keep closing. This project was about starting that conversation now, before the technology makes it unavoidable.`,
    tags: ["AR", "AWS Bedrock", "Magic Leap 2", "5G", "Ethics in AI"],
    linkedinUrl:
      "https://www.linkedin.com/posts/stevesaundersmbe_would-you-rather-talk-to-a-person-or-activity-7345450907121201154-LR8f",
    videoUrl: "/media/mingle_mate.mp4",
    images: ["/media/magicleap.webp"],
  },
];
