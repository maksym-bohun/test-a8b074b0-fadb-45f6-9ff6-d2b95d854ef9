import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('campaign_reports')
@Index(['eventTime', 'clientId', 'eventName'], { unique: true })
export class CampaignReportsEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar' })
  campaign: string;

  @Column({ name: 'campaign_id', type: 'varchar' })
  campaignId: string;

  @Column({ type: 'varchar' })
  adgroup: string;

  @Column({ name: 'adgroup_id', type: 'varchar' })
  adgroupId: string;

  @Column({ type: 'varchar' })
  ad: string;

  @Column({ name: 'ad_id', type: 'varchar' })
  adId: string;

  @Column({ name: 'client_id', type: 'varchar' })
  clientId: string;

  @Column({ name: 'event_name', type: 'varchar' })
  eventName: string;

  @Column({
    name: 'event_time',
    type: 'timestamp',
  })
  eventTime: Date;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;
}
