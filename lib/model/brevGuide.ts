import { Server, Cpu, Cog, Terminal, Code, LucideIcon } from 'lucide-react';

export type DeploymentStep = {
  title: string;
  description: string;
  options?: string[];
  command?: string;
  details?: string;
  icon: LucideIcon;
};

export type BrevGuideConfig = {
  steps: DeploymentStep[];
};

const BREV_DEPLOYMENT_GUIDE: BrevGuideConfig = {
  steps: [
    {
      title: "Container Selection",
      description: "Choose your container mode for deployment",
      options: [
        "Container Mode (Docker)",
        "Docker Compose",
        "VM Mode with Jupyter"
      ],
      details: "Select a container mode that matches your deployment needs. Container mode is recommended for most ML workloads.",
      icon: Server
    },
    {
      title: "Framework Selection",
      description: "Select ML framework configuration",
      options: [
        "Default (Python + CUDA)",
        "PyTorch (Devel/Runtime)",
        "NVIDIA TensorRT/NeMo"
      ],
      details: "Choose frameworks based on your model architecture. Default container includes Python 3.10 and CUDA 12.0.1.",
      icon: Cog
    },
    {
      title: "GPU Selection",
      description: "Select your NVIDIA A100 configuration",
      options: [
        "A100 (40GB VRAM)",
        "A100 (80GB VRAM)",
        "2x A100 Configuration"
      ],
      details: "Select GPU configuration based on your model size and computational needs. Multiple providers available including GCP, Lambda Labs, and Crusoe.",
      icon: Cpu
    },
    {
      title: "CLI Installation & Setup",
      description: "Install Brev CLI and wait for instance configuration",
      details: "After installation, wait for your instance to be fully configured. This process includes setting up your selected frameworks and NVIDIA tools.",
      icon: Terminal
    },
    {
      title: "Access Development Environment",
      description: "Once instance is ready, access via preferred method",
      options: [
        "Jupyter Notebook interface",
        "SSH terminal access",
        "VSCode remote connection"
      ],
      details: "Choose your preferred development environment. Jupyter notebooks are pre-configured for ML development.",
      icon: Code
    }
  ]
};

export class BrevGuideGenerator {
  getDeploymentSteps(): DeploymentStep[] {
    return BREV_DEPLOYMENT_GUIDE.steps;
  }

  getStepByIndex(index: number): DeploymentStep | undefined {
    return BREV_DEPLOYMENT_GUIDE.steps[index];
  }

  getTotalSteps(): number {
    return BREV_DEPLOYMENT_GUIDE.steps.length;
  }
}