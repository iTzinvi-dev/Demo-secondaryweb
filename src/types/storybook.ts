export type ChibiSceneId =
  | 'chibi-lavender-breeze'
  | 'chibi-paper-plane'
  | 'chibi-cozy-cat'
  | 'chibi-starlight-tea';

export interface StoryMoment {
  id: string;
  chapterLabel: string;
  seasonLabel: string;
  title: string;
  storyText: string;
  quote: string;
  hiddenNote: string;
  sceneId: ChibiSceneId;
  onlineCartoonUrl: string;
  caption: string;
}

export interface ScrapbookEntry {
  id: string;
  pageLabel: string;
  title: string;
  date: string;
  body: string;
  marginNote: string;
  botanicalNote: string;
  sceneId: ChibiSceneId;
  onlineCartoonUrl: string;
}

export interface BirthdayCandle {
  id: number;
  label: string;
  wishText: string;
  isLit: boolean;
}
