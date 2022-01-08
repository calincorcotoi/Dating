import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/members';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  member!: Member;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  
  constructor(private memberService: MembersService, private route: ActivatedRoute, private accountService:AccountService) {
   }

  ngOnInit(): void {
    
    this.loadMember();
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    
  }

  getImages():NgxGalleryImage[]{
    const imageUrls = [];
    for(const photo of this.member.photos){
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }
  
  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if (username)
    this.memberService.getMember(username).subscribe(member =>{
      this.member = member;
      this.galleryImages = this.getImages();
    })

    // let username!:string ;
    // this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
    //   console.log(user.username);
    //   username = user.username;
    // })
    // this.memberService.getMember(username).pipe(take(1)).subscribe(member =>{
    //   this.member = member;
    //   this.galleryImages = this.getImages();
    // })
  }
}
