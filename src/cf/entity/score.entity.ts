import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('STAR_SCORE')
export class StarScoreEntity {
  @PrimaryColumn({
    type: 'number',
    name: 'MEMBER_ID',
  })
  memberId: number;

  @PrimaryColumn({
    type: 'number',
    name: 'EVENT_ID',
  })
  eventId: number;

  @Column({
    type: 'number',
    name: 'SCORE',
  })
  score: number;
}
