from __future__ import annotations

from pydantic import BaseModel


class SessionData(BaseModel):
    client_name: str
    caregiver_name: str
    place_of_service: str
    maladaptive_behaviors: list[MaladaptativeBehavior]
    reinforcers_used: list[str]
    session_end_state: str

    def to_dict(
        self,
    ) -> dict[str, str | list[dict[str, str | dict[str, str]]] | list[str]]:
        return {
            "client_name": self.client_name,
            "caregiver_name": self.caregiver_name,
            "place_of_service": self.place_of_service,
            "maladaptive_behaviors": [
                mb.to_dict() for mb in self.maladaptive_behaviors
            ],
            "reinforcers_used": self.reinforcers_used,
            "session_end_state": self.session_end_state,
        }


class MaladaptativeBehavior(BaseModel):
    behavior: str
    antecedent: str
    function: str
    intervention: str
    replacement_behavior: str
    prompts_used: str
    reinforcer: str
    consequence_based_reinforcement: str
    result: MaladaptativeBehaviorResult

    def to_dict(self) -> dict[str, str | dict[str, str]]:
        return {
            "behavior": self.behavior,
            "antecedent": self.antecedent,
            "function": self.function,
            "intervention": self.intervention,
            "replacement_behavior": self.replacement_behavior,
            "prompts_used": self.replacement_behavior,
            "reinforcer": self.reinforcer,
            "consequence_based_reinforcement": self.consequence_based_reinforcement,
            "result": self.result.to_dict(),
        }


class MaladaptativeBehaviorResult(BaseModel):
    increase: bool
    decrease: bool

    def to_dict(self) -> dict[str, str]:
        return {"increase": str(self.increase), "decrease": str(self.decrease)}
