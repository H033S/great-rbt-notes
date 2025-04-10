# models.py
from __future__ import annotations
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

# --- Original Models (Kept as requested, but not used by /api/test/report/) ---
class MaladaptativeBehaviorResult(BaseModel):
    increase: bool
    decrease: bool

    def to_dict(self) -> dict[str, str]:
        return {"increase": str(self.increase), "decrease": str(self.decrease)}

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

    def to_dict(self) -> Dict[str, Any]:
        return {
            "behavior": self.behavior,
            "antecedent": self.antecedent,
            "function": self.function,
            "intervention": self.intervention,
            "replacement_behavior": self.replacement_behavior,
            "prompts_used": self.prompts_used,
            "reinforcer": self.reinforcer,
            "consequence_based_reinforcement": self.consequence_based_reinforcement,
            "result": self.result.to_dict(), # This returns dict[str, str]
        }

class SessionData(BaseModel):
    client_name: str
    caregiver_name: str
    place_of_service: str
    maladaptive_behaviors: List[MaladaptativeBehavior] # Use List from typing
    reinforcers_used: List[str] # Use List from typing
    session_end_state: str

    def to_dict(self) -> Dict[str, Any]: # More precise typing than original
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

# --- NEW Models to match the Frontend's Structure ---

class OccurrenceData(BaseModel):
    antecedent: str
    maladaptive_behavior: str
    intervention: str
    result: str # Frontend sends this as a simple string

class ReinforcementData(BaseModel):
    reinforcers_used: str # Frontend sends this as a simple string
    when_reinforcer_used: str

class ClosureData(BaseModel):
    data_collected: str
    concerns: str
    next_steps: str

class SessionDetailsData(BaseModel):
    first_occurrence: Optional[OccurrenceData] = None
    second_occurrence: Optional[OccurrenceData] = None
    reinforcement: ReinforcementData
    closure: ClosureData

class FrontendReportData(BaseModel):
    # Fields directly from the frontend JSON structure
    client_name: str
    caregiver_name: str
    date_of_treatment: str
    address: str
    city: str
    state: str
    zip: str
    apt: Optional[str] = None # Handles if apt is missing, null, or an empty string
    session: SessionDetailsData # The nested session object