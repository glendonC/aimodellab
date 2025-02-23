
# Contributing to Model Intelligence Lab

First off, thanks for taking the time to contribute! 🎉

## Development Setup

1. Fork and clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create `.env.local` with required API keys (see README.md)
4. Start the development server:
```bash
npm run dev
```

## Project Structure 

need to add to this too
```
├── components/
│   └── ModelComparison/
│       ├── index.tsx         # Main comparison component
│       ├── ModelSelector.tsx # Model selection interface
│       ├── RaceControls.tsx  # Race visualization controls
│       ├── RaceProgress.tsx  # Race progress display
│       └── ModelInfo.tsx     # Model information display
├── lib/
│   └── model/
│       └── metrics.ts        # Performance benchmark data
```

## Adding New Features

### Adding a New Model (will later be refactored into dynamic uploads via Netron or another service)
1. Update `lib/model/metrics.ts` with benchmark data:
```typescript
MODEL_METRICS = {
  'your_model': {
    cpu: {
      inferenceSpeed: number,  // FPS
      latency: number,        // ms
      memoryUsage: number,    // GB
      utilization: number     // %
    },
    gpu: {
      // Same metrics for GPU
    }
  }
}
```

### Modifying the Race Visualization
The race system uses real benchmark data from `metrics.ts`. When modifying:
1. Update `RaceControls.tsx` for race logic
2. Update `RaceProgress.tsx` for visualization
3. Test with multiple model combinations

## Code Style

- Use TypeScript for type safety
- Follow existing component patterns
- Add comments for complex logic
- Use meaningful variable names

## Testing

Before submitting a PR:
1. Test your changes with multiple models
2. Verify performance metrics accuracy
3. Check mobile responsiveness
4. Ensure no console errors

## Pull Request Process

1. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Commit your changes:
```bash
git commit -m "feat: description of your changes"
```

3. Push to your fork and submit a PR

4. PR Title Format:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- perf: Performance improvements

## Code Review

- All PRs require review
- Address review feedback promptly
- Keep PRs focused and manageable in size
- Include screenshots for UI changes

## Questions?

Feel free to open an issue for:
- Feature proposals
- Bug reports
- Documentation improvements
- General questions

Thank you for contributing! 🚀
