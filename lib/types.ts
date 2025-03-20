export type Program = Round[]

export interface Round {
  name: string
  exercises: Exercise[]
}

export interface Exercise {
  name: string
  amount: string | number
}

