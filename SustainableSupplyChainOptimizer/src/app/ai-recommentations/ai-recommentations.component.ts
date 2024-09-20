import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { CsvParserService } from '../services/csv-parser.service';

import { AiRecommendationService } from '../services/ai-recommendation.service';

interface Message {
  user: string;
  content: string;
}

@Component({
  selector: 'app-ai-recommentations',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './ai-recommentations.component.html',
  styleUrl: './ai-recommentations.component.scss'
})
export class AiRecommentationsComponent implements OnInit {
  csvData: any[] = [];
  headers: string[] = [];

  promptData = {
    prompt: ''
  };
  response: any;

  constructor(private csvParserService: CsvParserService, private aiRecommendationService: AiRecommendationService) { }

  ngOnInit(): void {
    this.csvParserService.getCsvData('assets/data/ai_recommendations.csv').subscribe((data: any[]) => {
      this.csvData = data;
      if (data.length > 0) {
        this.headers = Object.keys(data[0]); // Get headers from the first row
      }
    });
  }

  messages: Message[] = [];
  newMessage: string = '';
  isChatLoading: boolean=false;
  pageNo:number=1;
  pageSize:number=5;
  NoOfPages:number=10;

  sendMessage() {
    if (this.newMessage.trim()) {
      this.isChatLoading=true;
      this.showMessage(this.newMessage, "Me");
      this.promptData.prompt=this.newMessage;
      this.submitPrompt();
      //this.showMessage("Hello! As an artificial intelligence, I don't have feelings, but I'm here and ready to assist you. What can I help you with today?","AI");
      this.newMessage = '';
    }
  }

  submitPrompt(): void {
    this.aiRecommendationService.sendPrompt(this.promptData).subscribe(
      (res:any) => {
        this.response = res;
        this.showMessage(res,"AI")
        this.isChatLoading=false;
      },
      (error: any) => {
        this.showMessage("Ooops! There's a problem.","AI")
        console.error('Error:', error);
        this.isChatLoading=false;
      }
    );
  }

  nextPage(): void{
    this.pageNo=this.pageNo+1;
  }

  previousPage(): void{
    this.pageNo=this.pageNo-1;
  }

  gotoPage(page:number): void{
    this.pageNo=page;
  }

  showMessage(msg:string, user:string): void {
    if (msg.trim()) {
      const message: Message = {
        user: user,  
        content: msg
      };

      this.messages.push(message);
    }
  }
}