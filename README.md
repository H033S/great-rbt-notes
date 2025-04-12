# Great RBT Notes

An AI-powered tool designed to streamline session note generation for Registered Behavior Technicians (RBTs), created for the course Artificial Intelligence (CAP4630).

## Project Overview

Registered Behavior Technicians (RBTs) play a crucial role in providing therapy for individuals with autism and other developmental disorders through Applied Behavior Analysis (ABA). This project addresses the significant challenge of extensive documentation required after each session, which often detracts from the time RBTs could spend with clients or improving care quality. This project combines domain-specific understanding of ABA therapy with the power of natural language processing and machine learning to reduce administrative workload. By generating accurate and standardized reports automatically, the tool allows RBTs to focus more on therapeutic engagement and less on post-session documentation.

## Motivation

The development of this tool was driven by several key challenges in the RBT field:

- **Time-Consuming Documentation**: RBTs face high caseloads, making it challenging to balance multiple clients and administrative tasks
- **Risk of Burnout**: The emotional demands of managing challenging behaviors, coupled with administrative overload, can lead to emotional exhaustion
- **Inconsistencies and Errors**: Manual note-taking is susceptible to inconsistencies and errors, potentially impacting care quality and regulatory compliance
- **Data Security and Privacy**: RBTs handle sensitive client information, and secure handling of session notes is critical for maintaining confidentiality and HIPAA compliance.

## Objectives

Our AI-powered tool aims to:

- **Automate Documentation**: Convert structured inputs into well-formatted reports using NLP and AI models
- **Enhance Accuracy and Consistency**: Reduce human errors and ensure standardized reports
- **Increase Efficiency**: Minimize paperwork time, allowing focus on client interaction
- **Improve Accessibility**: Provide an easy-to-use interface for quick report generation
- **Ensure Compliance**: Align reports with insurance and regulatory requirements
- **Support Collaboration**: Facilitate sharing and review of notes among supervisors and team members.

## Technical Stack

### Frontend (Client)
- React.js
- Next.js
- Lucide React (Icons)
- html2pdf.js (PDF Generation)

### Backend (API)
- FastAPI
- OpenAI Integration
- Pydantic (for data validation)
- uvicorn (for running the FastAPI server)
- React Query (for managing frontend data fetching and caching)
- Tailwind CSS (for styling)

## Related Work

Simplified:

	Simplified is an AI-powered writing assistant tailored for improving grammar and writing quality in short-form content. It offers users tools to polish and refine text, with a character-limited free plan that restricts usage to brief entries and a maximum of two workspaces. Despite its constraints, it helps enhance readability and professionalism in PDF-based documents.

Copy.ai:

	Copy.ai is a generative AI platform that assists users in creating short-form content based on text prompts. Like ChatGPT, it generates results quickly but is limited by character caps and a lack of contextual understanding for more complex documentation. It’s useful for drafting brief notes or scripts but is not tailored for domain-specific use cases like RBT session reports.

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
3. Set up environment variables:
   - Create a `.env` file in the `api` directory
   - Add your OpenAI API key and other necessary configurations

## Evaluation Criteria

Success will be measured based on:
- **Functionality**: Correct processing of inputs and report generation
- **Accuracy & Clarity**: Alignment with RBT documentation standards
- **Usability**: Intuitive interface and time-saving features
- **Testing Coverage**: Comprehensive tests using Jest (frontend) and pytest (backend)
- **Security**: Proper handling of sensitive user and client data
- **Scalability**: Ability to support multiple concurrent users without performance degradation