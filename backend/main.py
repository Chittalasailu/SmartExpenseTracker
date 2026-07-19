from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models
import schemas
import crud
from database import engine, get_db

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Smart Expense Tracker API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Home Route
@app.get("/")
def home():
    return {"message": "Smart Expense Tracker API is running!"}


# ----------------------------
# CREATE EXPENSE
# ----------------------------
@app.post("/expenses", response_model=schemas.Expense)
def create_expense(expense: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    return crud.create_expense(db, expense)


# ----------------------------
# GET ALL EXPENSES
# ----------------------------
@app.get("/expenses", response_model=list[schemas.Expense])
def read_expenses(db: Session = Depends(get_db)):
    return crud.get_expenses(db)


# ----------------------------
# GET SINGLE EXPENSE
# ----------------------------
@app.get("/expenses/{expense_id}", response_model=schemas.Expense)
def read_expense(expense_id: int, db: Session = Depends(get_db)):
    expense = crud.get_expense(db, expense_id)

    if expense is None:
        raise HTTPException(status_code=404, detail="Expense not found")

    return expense


# ----------------------------
# UPDATE EXPENSE
# ----------------------------
@app.put("/expenses/{expense_id}", response_model=schemas.Expense)
def update_expense(
    expense_id: int,
    expense: schemas.ExpenseCreate,
    db: Session = Depends(get_db),
):
    updated_expense = crud.update_expense(db, expense_id, expense)

    if updated_expense is None:
        raise HTTPException(status_code=404, detail="Expense not found")

    return updated_expense


# ----------------------------
# DELETE EXPENSE
# ----------------------------
@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_expense(db, expense_id)

    if deleted is None:
        raise HTTPException(status_code=404, detail="Expense not found")

    return {"message": "Expense deleted successfully"}