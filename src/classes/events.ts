export class AppEvent {
  type: string;
  date: Date;
  id: number;
  constructor(type: string, id: number) {
    this.type = type;
    this.date = new Date();
    this.id = id;
  }
}

export class Transaction extends AppEvent {
  amount: number;
  currency: string;
  counteragent: string;
  description: string;
  isIncome: boolean;
  constructor(data: any) {
    super(data.type, data.id);
    this.date = new Date(data.date);
    this.type = 'transaction';
    this.amount = data.amount;
    this.currency = data.currency;
    this.counteragent = data.counteragent;
    this.description = data.description;
    this.isIncome = (data.isIncome) ? data.isIncome : false;
  }
}

export class Article extends AppEvent {
  title: string;
  content: string;
  isRead: boolean;
  constructor(data: any) {
    super(data.type, data.id);
    this.date = new Date(data.date);
    this.type = 'article';
    this.title = data.title;
    this.content = data.content;
    this.isRead = data.isRead || false;
  }
}
