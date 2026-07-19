from sqlalchemy.orm import Session
import models
import schemas


# ----------------------------
# CREATE EXPENSE
# ----------------------------
def create_expense(db: Session, expense: schemas.ExpenseCreate):
    db_expense = models.Expense(
        title=expense.title,
        amount=expense.amount,
        category=expense.category,
        date=expense.date,
    )

    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)

    return db_expense


# ----------------------------
# GET ALL EXPENSES
# ----------------------------
def get_expenses(db: Session):
    return db.query(models.Expense).all()


# ----------------------------
# GET SINGLE EXPENSE
# ----------------------------
def get_expense(db: Session, expense_id: int):
    return (
        db.query(models.Expense)
        .filter(models.Expense.id == expense_id)
        .first()
    )


# ----------------------------
# UPDATE EXPENSE
# ----------------------------
def update_expense(
    db: Session,
    expense_id: int,
    expense: schemas.ExpenseCreate,
):
    db_expense = (
        db.query(models.Expense)
        .filter(models.Expense.id == expense_id)
        .first()
    )

    if db_expense is None:
        return None

    db_expense.title = expense.title
    db_expense.amount = expense.amount
    db_expense.category = expense.category
    db_expense.date = expense.date

    db.commit()
    db.refresh(db_expense)

    return db_expense


# ----------------------------
# DELETE EXPENSE
# ----------------------------
def delete_expense(db: Session, expense_id: int):
    db_expense = (
        db.query(models.Expense)
        .filter(models.Expense.id == expense_id)
        .first()
    )

    if db_expense is None:
        return None

    db.delete(db_expense)
    db.commit()

    return db_expense