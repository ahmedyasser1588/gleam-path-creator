// Birthday configuration - change this date to the actual birthday
export const BIRTHDAY_DATE = new Date("2026-04-06T00:00:00");

// Daily messages for the 10-day countdown
export const DAILY_MESSAGES = [
  { 
    day: 10, 
    title: "Day 10 ✨", 
    message: "10 Days left ya Esoooooooooo 😘♥️♥️♥️\nفاضل بالظبط عشر ايام علي عيد ميلادك كل يوم هنا من اول دلوقتي لحد عيد ميلادك هيكون ليكي ماسدج مني😘🫂\nبعد ست سنين معرفه و3 سنين علي الاقل عايشين نايمين واكلين شاربين مع بعض وسنه ارتباط ومكالمات كتير كتير كتيييييييييييييييييييييييييير بالساعات والشيفتات احب اقولك اني اسعد انسان ان معايا بنوته زيك حلاوه ورقه ورومانسيه وتقدير وكل حاجه تحفه ♥️🫂🫂\nمحظوظ ان في حياتي حد معايا السنين دي كلها حافظني وحافظه فاهمني وفاهمه حضن ليا وبحاول ابقي سند ليه ♥️♥️🫂\nبينا حاجات كتير معملنهاش ولا هنعملها غير مع بعض اول حد اجيبله ويجيبلي هدايا اول حد اخش معاه سينما اول حد اخرج معاه كم الخروجات دي كللها وابقي مبسوط ♥️♥️🫂\nكل فتره بتحلوي في عيني اكتر واكتررررر والله 😘♥️♥️\nبحبك وبموت فيكي يا اايسوو وعقبال العمر كله يارب وعقبال ما احتفل بعيد ميلادك في بيتنا ونعمل احلي ليله واحلي احتفال لحبيبه عمري كله 🫂♥️" 
  },
  { day: 9, title: "Day 9 💫", message: "Did you know? The universe aligned in the most perfect way to create someone as amazing as you." },
  { day: 8, title: "Day 8 🌸", message: "Eight days until the world celebrates YOU. Start practicing your birthday smile!" },
  { day: 7, title: "Day 7 🦋", message: "One week to go! If I could gift you anything, it would be a mirror that shows how everyone sees you — absolutely radiant." },
  { day: 6, title: "Day 6 💝", message: "Fun fact: On this day, somewhere in the world, someone is smiling because of a memory with you." },
  { day: 5, title: "Day 5 🎵", message: "Five days left! You're the melody that’s been playing in my heart since the day we met." },
  { day: 4, title: "Day 4 🌙", message: "Four days left! The stars are getting ready to shine extra bright for you." },
  { day: 3, title: "Day 3 🎀", message: "Three days! I'm running out of ways to say how special you are... just kidding, there are infinite ways." },
  { day: 2, title: "Day 2 💐", message: "Tomorrow is almost here! The butterflies in my heart are doing a full choreography for you." },
  { day: 1, title: "Day 1 🎂", message: "TOMORROW IS THE DAY! Get ready for the most magical birthday celebration. You deserve every bit of happiness!" },
];

export function getDaysUntilBirthday(): number {
  const now = new Date();
  const birthday = new Date(BIRTHDAY_DATE);
  
  // تصفير الوقت للمقارنة بالأيام فقط
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const bday = new Date(birthday.getFullYear(), birthday.getMonth(), birthday.getDate());

  // إذا كان التاريخ قد مر في السنة الحالية، نحسب للسنة القادمة
  if (bday < today) {
    bday.setFullYear(today.getFullYear() + 1);
  }

  const diff = bday.getTime() - today.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getDailyMessage(): typeof DAILY_MESSAGES[0] | null {
  const days = getDaysUntilBirthday();
  if (days < 1 || days > 10) return null;
  return DAILY_MESSAGES.find((m) => m.day === days) || null;
}

export type BirthdayPhase = "countdown" | "pre-birthday" | "birthday";

export function getBirthdayPhase(): BirthdayPhase {
  const days = getDaysUntilBirthday();
  if (days === 0) return "birthday";
  if (days <= 10) return "pre-birthday";
  return "countdown";
}

export function getParticleIntensity(): number {
  const days = getDaysUntilBirthday();
  if (days === 0) return 1;
  if (days > 10) return 0.1;
  // Linear scale: day 10 = 0.2, day 1 = 0.9
  return 0.2 + (10 - days) * 0.078;
}