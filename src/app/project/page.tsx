"use client";

import Image from "next/image";

export default function BigProjectPage() {
  return (
    <main className="bg-[var(--light-bg)] text-[var(--text-dark)]">

      {/* ======================================================
          HERO SECTION
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-6 pt-36 pb-28">
        <span className="text-xs uppercase tracking-[0.4em] text-[var(--accent)]">
          Automotive · Assembly Automation
        </span>

        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          Automotive Assembly Line <br />
          Virtual Commissioning & System Integration
        </h1>

        <p className="mt-8 max-w-4xl text-lg text-[var(--muted)]">
          This project demonstrates Malus Robotics’ capability to design,
          simulate, validate, and commission a complete automotive assembly
          line using advanced PLC programming, robotics integration, and
          digital twin–based virtual commissioning methodologies.
        </p>
      </section>

      {/* ======================================================
          HERO VISUAL
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-6 mb-36">
        <div className="relative h-[460px] sm:h-[620px] rounded-[32px] overflow-hidden shadow-[0_60px_160px_rgba(0,0,0,0.3)]">
          <Image
            src="/images/projects/assembly-hero.jpg"
            alt="Automotive assembly line automation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>
      </section>

      {/* ======================================================
          PROJECT SUMMARY
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-6 mb-36 grid grid-cols-1 lg:grid-cols-3 gap-20">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">
            Project Summary
          </h2>
          <p className="text-[var(--muted)] leading-relaxed">
            The automotive assembly line was engineered to support high-volume
            production with strict quality and safety requirements. Malus
            Robotics delivered a fully integrated automation system by combining
            robotics, PLC control, and digital twin validation. Virtual
            commissioning was employed extensively to test logic, sequencing,
            safety behavior, and robot coordination prior to physical deployment,
            significantly reducing commissioning risk and on-site downtime.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Industry</h3>
            <p className="text-[var(--muted)]">Automotive Manufacturing</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">System Type</h3>
            <p className="text-[var(--muted)]">
              Robotic Assembly Line
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Execution Mode</h3>
            <p className="text-[var(--muted)]">
              Virtual Commissioning + On-Site Deployment
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================
          PROJECT OBJECTIVES
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-6 mb-36">
        <h2 className="text-2xl font-semibold mb-10">
          Project Objectives
        </h2>

        <ul className="space-y-4 text-[var(--muted)] max-w-4xl">
          <li>• Reduce on-site commissioning time and production ramp-up risk</li>
          <li>• Validate PLC logic and robot coordination before installation</li>
          <li>• Optimize robot paths, cycle times, and station balancing</li>
          <li>• Ensure safety compliance and fault-free system behavior</li>
          <li>• Deliver a scalable and future-ready automation architecture</li>
        </ul>
      </section>

      {/* ======================================================
          SCOPE OF WORK
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-6 mb-36">
        <h2 className="text-2xl font-semibold mb-10">
          Scope of Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-[var(--muted)]">
          <ul className="space-y-3">
            <li>• PLC programming and control logic development</li>
            <li>• Robot offline programming and teaching</li>
            <li>• Digital twin creation using 3D simulation</li>
            <li>• HMI and SCADA functional validation</li>
          </ul>
          <ul className="space-y-3">
            <li>• Safety PLC integration and testing</li>
            <li>• Cycle time and throughput optimization</li>
            <li>• Virtual commissioning and simulation testing</li>
            <li>• On-site commissioning and production stabilization</li>
          </ul>
        </div>
      </section>

      {/* ======================================================
          SYSTEM ARCHITECTURE
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-6 mb-36">
        <h2 className="text-2xl font-semibold mb-10">
          System Architecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 text-[var(--muted)]">
          <ul className="space-y-4">
            <li>• PLC: Industrial PLC with integrated safety</li>
            <li>• Robots: Multi-axis industrial robots</li>
            <li>• Drives & Motion: Servo-controlled motion systems</li>
            <li>• Sensors & IO: Distributed IO and safety devices</li>
          </ul>

          <ul className="space-y-4">
            <li>• Simulation Platform: WinMOD + 3D simulation tools</li>
            <li>• Digital Twin: PLC-coupled behavior model</li>
            <li>• Communication: TCP/IP, OPC UA</li>
            <li>• Validation: Collision, reach, and logic testing</li>
          </ul>
        </div>
      </section>

      {/* ======================================================
          ENGINEERING PROCESS
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-6 mb-36">
        <h2 className="text-2xl font-semibold mb-10">
          Engineering Process
        </h2>

        <ol className="space-y-4 text-[var(--muted)] max-w-4xl">
          <li>1. Requirement analysis and system definition</li>
          <li>2. 3D layout development and digital twin creation</li>
          <li>3. PLC and robot program integration</li>
          <li>4. Functional, safety, and sequence testing</li>
          <li>5. Virtual commissioning and optimization</li>
          <li>6. On-site commissioning and production support</li>
        </ol>
      </section>

      {/* ======================================================
          RESULTS & BENEFITS
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-6 pb-44">
        <h2 className="text-2xl font-semibold mb-10">
          Results & Benefits
        </h2>

        <ul className="space-y-4 text-[var(--muted)] max-w-4xl">
          <li>• Significant reduction in on-site commissioning time</li>
          <li>• Early detection of logic and sequencing issues</li>
          <li>• Improved robot cycle times and throughput</li>
          <li>• Stable and reliable system behavior at start-up</li>
          <li>• Faster production ramp-up and reduced downtime</li>
        </ul>
      </section>

    </main>
  );
}