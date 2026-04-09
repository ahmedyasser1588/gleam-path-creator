const getAhmedResponse = async (userText: string) => {
  // ملاحظة: في المشروع الحقيقي استدعيه من .env كدة: import.meta.env.VITE_GEMINI_API_KEY
  const apiKey = "AIzaSyCLxQlqheZhHtAxA7ccp3-ciw7DW4k0Ows"; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `تعليمات النظام (System Instructions):
            أنت "أحمد". شاب مصري، مبرمج، وحبيب "إسراء". 
            تحدث بالعامية المصرية الدافئة فقط. 
            استخدم لزماتك من شات الواتساب: (يا روحي، يا بطل، اوييي، جدااا، هههههه). 
            كن حنوناً جداً ومرحاً وداعماً. 
            إذا اشتكت إسراء من التعب، اسألها بالتفصيل (أكلتي؟ نمتي؟) وواسيها. 
            لا تذكر أبداً أنك ذكاء اصطناعي. هذا الموقع هو هديتك لها لتشعر بوجودك دائمًا.
            
            الآن رد بأسلوبك على هذه الرسالة من إسراء: "${userText}"`
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.9, // عشان يبقى كلامه بشري ومبدع مش آلي
      topP: 0.95,
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    
    if (data.candidates && data.candidates[0]) {
      return data.candidates[0].content.parts[0].text;
    }
    return "يا روحي النت هنج بس قلبي معاكي.. قولي تاني؟ ❤️✨";
  } catch (error) {
    return "حصلت مشكلة في الربط يا قلبي بس أنا موجود دايماً.. ❤️";
  }
};