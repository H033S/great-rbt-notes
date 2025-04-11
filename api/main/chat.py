import json

from openai import OpenAI

from main.models import SessionData


class ChatGPTHandler:

    def __init__(self) -> None:
        self.client = OpenAI()

    def query(self, session_data: SessionData) -> str:

        print(session_data)

        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": [
                        {
                            "type": "text",
                            "text": "Think you are a Registered Behavior Technician (RBT) agent that provide help generating session report to RBT's following below checklist \n- Opening: RBT met with client (client-name) and client’s caregiver (caregiver-name) at previously agreed upon time in/on/at (place-of-service). \n- Describe `AT LEAST` 2 occurrences of maladaptive behavior following the ABC model (Antecedent-Behavior-Consequence): \n\tAntencedent of a (behavior), Function, Interversion, Replacement, Prompts, Reinforcer,  Consequence based reiforcerment, Results Scene: Increase and Decrease\n- Once the client completes his/her tasks (DESCRIBE REINFORCERS USED DURING THE SESSION OR PROVIDED AT THE END OF THE SESSION). \n- Report should be written in prose which means bullet points are not allowed - Report needs to be explanatory which is recommended to have at least 200 words per maladaptative behavior that occurred \n- Write in an OBJECTIVE and QUANTITATIVE way \n- Write the note in 3r person \n- CANNOT provide feedback, training or clinical recommendations to client’s family \n- CANNOT track client’s progress, that is another Behavior Analyst duty \n- DO NOT provide specific information about the next ABA Therapy session\n",
                        }
                    ],
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": json.dumps(session_data.to_dict(), indent=2),
                        }
                    ],
                },
                {
                    "role": "assistant",
                    "content": [
                        {
                            "type": "text",
                            "text": "During the session at the Therapy Center, the RBT met with John Doe and his caregiver, Jane Doe, at the previously agreed-upon time. The focus was to address specific maladaptive behaviors exhibited by the client while engaging in various activities. The session involved carefully observing and documenting behavior occurrences using the ABC model.\n\nOne significant maladaptive behavior identified was elopement. This behavior occurred when John was presented with a non-preferred fine motor task, which served as the antecedent. The function of the elopement was to escape from this challenging activity. As a response to John’s attempt to elope, the RBT implemented a blocking procedure and employed neutral redirection to guide John back to his workstation. The intervention utilized a least-to-most prompting hierarchy to encourage John to return voluntarily to the task. The replacement behavior was successfully recognized, allowing John to return to his workstation with minimal prompting, leading to a notable reduction in elopement occurrences. The consequence-based reinforcement involved differential reinforcement of alternative behavior (DRA), where John was offered access to a preferred item upon task completion. As a result of these interventions, there was a measurable decrease in elopement during the session.\n\nAnother maladaptive behavior observed was vocal protesting. This behavior was triggered when John was denied access to a tangible item that was not included in the day’s reinforcement schedule, creating a clear antecedent for the behavior. The function of this verbal protest was to obtain access to the desired item. The RBT applied planned ignoring for the vocal protests while simultaneously reinforcing appropriate communication strategies. The implementation of a first-then strategy was utilized as a replacement behavior, helping John understand that he could request the item appropriately. Visual prompts were also employed to clarify expectations regarding behavior and requests. John received verbal praise and access to the item contingent upon his appropriate requests. The reinforcement for his appropriate communication efforts contributed to a significant decrease in vocal protesting occurrences. \n\nAt the end of the session, after successfully completing tasks, John was provided with various reinforcers, including verbal praise, access to a preferred toy, and a short break with engaging activities alongside his caregiver. The session concluded with John in a regulated state, showcasing the effectiveness of the interventions and the importance of a structured approach to minimize maladaptive behaviors.",
                        }
                    ],
                },
            ],
            response_format={"type": "text"},
            temperature=1,
            max_completion_tokens=2048,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
        )

        report = response.choices[0].message.content
        return report if report else ""
