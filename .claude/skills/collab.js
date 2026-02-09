#!/usr/bin/env node

/**
 * Collaborative Multi-Agent Skill
 *
 * Invokes multiple agents in parallel to get comprehensive perspectives,
 * then asks Claude to synthesize them into a cohesive answer.
 *
 * Usage:
 *   /collab "Should I use modals or slide-overs for the settings panel?"
 *   /collab "How should we implement real-time updates in the dashboard?"
 *   /collab "What's the best approach for user onboarding?"
 */

const { execFileSync } = require('child_process');
const path = require('path');

const AGENTS = [
  {
    name: 'Engineer',
    script: path.join(__dirname, '../agents/engineer.js')
  },
  {
    name: 'Designer',
    script: path.join(__dirname, '../agents/designer.js')
  },
  {
    name: 'PM',
    script: path.join(__dirname, '../agents/pm.js')
  }
];

async function runAgent(agentScript, question) {
  try {
    const output = execFileSync('node', [agentScript, question], {
      encoding: 'utf-8',
      maxBuffer: 1024 * 1024
    });
    return output;
  } catch (error) {
    return `Error running agent: ${error.message}`;
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: /collab "your question"');
    console.error('');
    console.error('This skill invokes multiple agents (Engineer, Designer, PM) in parallel');
    console.error('to give you comprehensive perspectives on your question.');
    console.error('');
    console.error('Examples:');
    console.error('  /collab "Should I use modals or slide-overs for settings?"');
    console.error('  /collab "How should we implement real-time dashboard updates?"');
    console.error('  /collab "What\'s the MVP for user authentication?"');
    process.exit(1);
  }

  const question = args.join(' ');

  console.log('# Multi-Agent Collaboration\n');
  console.log(`**Question:** ${question}\n`);
  console.log('---\n');

  // Run all agents in parallel
  console.log('Gathering perspectives from Engineer, Designer, and PM...\n');

  const results = await Promise.all(
    AGENTS.map(async agent => {
      const output = await runAgent(agent.script, question);
      return { name: agent.name, output };
    })
  );

  // Output all perspectives
  results.forEach((result, index) => {
    console.log(`## ${result.name} Perspective\n`);
    console.log(result.output);

    if (index < results.length - 1) {
      console.log('\n---\n');
    }
  });

  // Ask Claude to synthesize
  console.log('\n---\n');
  console.log('## Synthesis Request\n');
  console.log('Please synthesize these three perspectives into a cohesive recommendation:');
  console.log('1. Identify areas of agreement across perspectives');
  console.log('2. Highlight any tensions or trade-offs between perspectives');
  console.log('3. Provide a clear, actionable recommendation that balances all viewpoints');
  console.log('4. Note any follow-up questions or validation steps needed');
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
