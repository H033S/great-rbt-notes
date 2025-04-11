# Great RBT Notes

An AI-powered tool designed to streamline session note generation for Registered Behavior Technicians (RBTs), created for the course Artificial Intelligence (CAP4630).

## Project Overview

Registered Behavior Technicians (RBTs) play a crucial role in providing therapy for individuals with autism and other developmental disorders through Applied Behavior Analysis (ABA). This project addresses the significant challenge of extensive documentation required after each session, which often detracts from the time RBTs could spend with clients or improving care quality.

## Motivation

The development of this tool was driven by several key challenges in the RBT field:

- **Time-Consuming Documentation**: RBTs face high caseloads, making it challenging to balance multiple clients and administrative tasks
- **Risk of Burnout**: The emotional demands of managing challenging behaviors, coupled with administrative overload, can lead to emotional exhaustion
- **Inconsistencies and Errors**: Manual note-taking is susceptible to inconsistencies and errors, potentially impacting care quality and regulatory compliance

## Objectives

Our AI-powered tool aims to:

- **Automate Documentation**: Convert structured inputs into well-formatted reports using NLP and AI models
- **Enhance Accuracy and Consistency**: Reduce human errors and ensure standardized reports
- **Increase Efficiency**: Minimize paperwork time, allowing focus on client interaction
- **Improve Accessibility**: Provide an easy-to-use interface for quick report generation
- **Ensure Compliance**: Align reports with insurance and regulatory requirements

## Technical Stack

### Frontend (Client)
- React.js
- Next.js
- Lucide React (Icons)
- html2pdf.js (PDF Generation)

### Backend (API)
- FastAPI
- OpenAI Integration

## Related Work

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python 3.8+
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install API dependencies
   cd ../api
   pip install -r requirements.txt
   ```
## Evaluation Criteria

Success will be measured based on:
- **Functionality**: Correct processing of inputs and report generation
- **Accuracy & Clarity**: Alignment with RBT documentation standards
- **Usability**: Intuitive interface and time-saving features
- **Testing Coverage**: Comprehensive tests using Jest (frontend) and pytest (backend)