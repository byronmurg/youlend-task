from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel
import uuid
import os

mount_path = os.getenv("MOUNT_PATH", "/api")
router = APIRouter(prefix=mount_path)

class Loan(BaseModel):
    id: uuid.UUID
    repaymentAmount: float
    fundingAmount: float
    reason: str

# This is the state store
loans = []

##########################
# Retrieve routes
##########################

@router.get("/loan")
def get_loans() -> list[Loan]:
    return loans

@router.get("/loan/{id}")
def get_loan_by_id(id: uuid.UUID) -> Loan:
    for loan in loans:
        if (loan["id"] == id):
            return loan
    raise HTTPException(status_code=404, detail="Loan not found")


##########################
# Create route
##########################

class LoanInputData(BaseModel):
    requestedAmount: float
    reason: str

@router.post("/loan", status_code=201)
def create_loan(inputData:LoanInputData) -> uuid.UUID:
    id = uuid.uuid4()
    loan:Loan = {
        "id": id,
        "fundingAmount": inputData.requestedAmount,
        "repaymentAmount": inputData.requestedAmount,
        "reason": inputData.reason,
    }
    loans.append(loan)
    return id

##########################
# Delete route
##########################

class DeleteResponse(BaseModel):
    deletedId: uuid.UUID

@router.delete("/loan/{id}")
def delete_loan_by_id(id: uuid.UUID) -> DeleteResponse:
    for loan in loans:
        if (loan["id"] == id):
            loans.remove(loan)
            return { "deletedId":id }
    raise HTTPException(status_code=404, detail="Loan not found")


app = FastAPI()
app.include_router(router)
