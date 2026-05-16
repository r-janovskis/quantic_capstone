from sqlmodel import Session, select, col
from database.models.language import Language, LanguagePublic

def get_all_languages(session: Session) -> list[Language]:
    statement = select(Language)
    return list(session.exec(statement).all())


def get_selected_languages(session: Session, language_ids: list[int]) -> list[LanguagePublic]:
    statement = select(Language).where(col(Language.id).in_(language_ids))
    return [LanguagePublic.model_validate(language) for language in session.exec(statement).all()]