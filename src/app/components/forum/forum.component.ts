import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/services/forum.service';



interface ForumPost {
  post: string;
  filename: string;
  comments: string[];
  newComment?: string;
  date: string; // format ISO 8601
}


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  newMessage = '';
  forumPosts: ForumPost[] = [];

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    this.refreshMessages();
  }

  post(): void {
    if (!this.newMessage.trim()) return;

this.forumService.postMessage(this.newMessage).subscribe({
  next: () => {
    this.newMessage = '';
    this.refreshMessages();
  },
  error: (err) => {
    console.error('Erreur lors de l’envoi du message :', err);
  }
});

  }

  comment(post: ForumPost): void {
    if (!post.newComment?.trim()) return;

    this.forumService.postComment(post.filename, post.newComment).subscribe(() => {
      post.newComment = '';
      this.refreshMessages();
    },
  );
  }

  refreshMessages(): void {
this.forumService.getAllMessagesAndComments().subscribe(res => {
  this.forumPosts = res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

  }
}
