type AnalyticsEvent =
  | { event: 'game_start'; difficulty: string; category: string; surpriseMe: boolean }
  | { event: 'game_complete'; duration: number; completed: boolean; xp: number; coins: number }
  | { event: 'game_abandon'; duration: number; screen: string }
  | { event: 'bingo_stamp'; squareId: number; activityId: string }
  | { event: 'bingo_line'; lineType: 'row' | 'column' | 'diagonal' }
  | { event: 'bingo_blackout'; weekNumber: number }
  | { event: 'badge_unlock'; badgeId: string }
  | { event: 'surprise_spin'; activityId: string }
  | { event: 'science_fact_shown'; factId: string }
  | { event: 'auth_sign_in'; method: 'google' }
  | { event: 'auth_guest_play' }
  | { event: 'pwa_install' };

export function trackEvent(data: AnalyticsEvent): void {
  if (import.meta.env.DEV) {
    console.log('[Analytics]', data);
  }
}
