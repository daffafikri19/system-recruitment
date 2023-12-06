export interface QuestionType {
    id: string,
    question: string,
    type: string,
    category: string,
    required: boolean,
    createdAt: string,
    updatedAt: string,
    createdBy: string | null,
    createdByAdmin: [] | null,
    _count: number
}

export interface CategoryType {
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
}