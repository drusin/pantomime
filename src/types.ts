export type Profile = {
  id: number,
  image: string,
}

export type Image = {
  subject: string,
  image: string
}

export type GameSettings = {
  condition: 'AMOUNT_CARDS' | 'AMOUNT_WINS',
  amount: number,
}
