import { motion } from "framer-motion";
import VirtualCake from "@/components/VirtualCake";
import TypewriterMessage from "@/components/TypewriterMessage";
import Envelope from "@/components/Envelope";
import DreamCollector from "@/components/DreamCollector";
import TimeMachineButton from "@/components/TimeMachineButton";
import { Gift, Heart } from "lucide-react";

const envelopes = [
  { 
    title: "Open When You're annoying From ME", 
    message: "معرفش انتي مضايقه مني في اي بس زمانك كالعاده شايفه كل ردودي مستفزه (هعديها هعديها ) بس عموما ايا كان المشكله اللي بينا خليها دايما تاخد حجمها الطبيعي وشوفي حجمها جمب علاقتنا علي مدار السنين ♥️🫂حجمها جمب كلامنا كول للصبح جمب كلامنا بالشيفتات جمب خروجاتنا سوا قعدتنا في الاهرام سوا🫂♥️ جمب حاجه لطيفه عملتهالك خلتك فرحانه فيها جمب خوفي عليكي دايما جمب تخطيطنا لبعض بعد الجواز واني هدلعك وتدلعيني وافرحك وتفرحيني وجمب حاجات كتييييييييييييير اوي  😘😘♥️هتلاقي انها مش مستاهله خالص تخليكي مش حباني او مضايقه متي مهما كانت هي اي صدقيني لانها دايما نقطه في بحر ♥️🫶معرفش احنا وضعنا اي دلوقتي وانتي مضايقه بس يعني لو انا بحاول اصالحك افتكري  الحلو بينا وحاولي تحبيني شويه زياده وتصالحيني ولو انا مضايق منك حاولي تفتحي كلام المهم ان علاقتنا تفضل دايما اولي اولوياتنا 😘😘♥️بحبك ♥️🫂", 
    condition: "Always Remember  That I LOVE YOU", 
    isUnlocked: true 
  },
  { 
    title: "Open When You Miss Me", 
    message: "والله انتي كمان علي طول وحشاااااااااااني يا ايسو🫂🫂♥️ حرفيا دا الطبيعي والله رغم انك دايما بتحاولي تحسسيني انك معايا دايما وانا والله بحاول برضو اعمل دا ♥️♥️🫂بس متعرفيش بتوحشيني قد اي وازاي اصلا متوحشنيش وانا بقالي ست سنين كل يوم مش بيعدي يوم الا وبكلمك حتي لو متخانقين حتي لو بكلمك من تحت درسي زي ما بتقولي بس 6 سنين كل يوم بكلمك طبيععي لما تغيبي عني ساعتين توحشيني😘♥️♥️بموت فيكي وبحببببببببببببك ♥️🫂",
    condition: "When you want to hug me 🫂♥️", 
    isUnlocked: true 
  },
  { 
    title: "Open When You're Overwhelmed", 
    // ملاحظة: الرسالة هنا بالإنجليزية للحفاظ على شكل الموقع، والنص العربي هو اللي كتبتهولك فوق
    message: "بصي مش هكتر عليكي اوي في الرساله دي لان عارف ان لو انتي تعبانه مش هتكوني طايقه كلام بس افتكري دايما ان معاكي حد مهتم بكل حواراتك وكل مواويلك سواء تافهه او مش تافهه وطالما مضايقاكي تبقي مش تافهه ♥️♥️انا دايما لما بتكوني في حاجه مش كويسه بحاول اوجدك حلول وممكن دا بيضايقك شويه بس لو مش عاوزه حلول ممكن تقوليلي دا واوعدك هحاول ابقي بخفف عنك بسالمهم اني عاوزك تعرفي ان ايا كان اي مشكلتك انا مهتم والله اني ابقي معاكي ولا ان نفسيتك تبقي وحشه ومحبش ابدا اشوفك نفسيتك وحشه ولا انهزاميه خالص 🫂♥️وقبل ما توصلي اصلا للمرحله دي خلينا نتكلم سوا كتييييييييير انا عارف سعات بكون مشغول بس بيبقي غصب عني والله بس لو الموضوع فيه نفسيتك انا دايما موجود ودايما انتي رقم 1 في اولولياتي🫶🫶", 
    condition: "صدقيني دي مش مجرد رساله لطيفه انا دايما جمبك", 
    isUnlocked: true // جعلتها true لتكون متاحة لها دائماً عند الحاجة
  },
];

const CelebrationPage = () => {
  return (
    <section className="min-h-screen pt-20 pb-16 sm:py-24 px-4 bg-hero-gradient">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground font-body mb-3">Chapter Three</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient-rose mb-4">Let's Celebrate</h2>
          <p className="text-sm sm:text-base text-muted-foreground font-body max-w-md mx-auto px-2">Make a wish and blow out the candles!</p>
        </motion.div>

        {/* Virtual Cake */}
        <motion.div
          className="flex justify-center mb-20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <VirtualCake />
        </motion.div>

        {/* Dream Collector */}
        <div className="mb-20">
          <DreamCollector />
        </div>

        {/* A Message For You — typewriter letter */}
        <motion.div
          className="mb-20 px-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <TypewriterMessage
            title="A Message For You"
            subtitle="Words from my heart to yours"
            paragraphs={[
              "حبيبتي إيسو،","مش عارف ابدأ منين ولا منين ولا منين ولا منين ♥️😂",
              "حاسس في حاجات كتير اوي محتاج اقولها، ممكن كلامي يكون مكرر بس كل مره بيكون طالع من قلبي كأني بقولهولك اول مره ♥️😘",
              "كل سنه وانتي كويسه يا حبيبتي دي اهم حاجه اتمناها ليكي♥️🫂🫂 وتاني حاجه اتمناها ان كل سنه وانتي معاياااا 🫂♥️",
              "كل سنه وخناقنا مهما كبر ملناش غير بعض 🥰♥️",
              "كل سنه وانتي اقرب حد ليا وانا اقرب حد ليكي 🫂🫂",
              "عاوز اقول ان مهما كان بينا ومهما اتخانقنا ومهما كنت مش كويس في اي وقت بسبب اي حاجه بينا ستظلي احسن حاجه حصلت في حياتي، وهتفضلي حبيبتي وصحبتي واقرب حد ليا في كل الاوقات ♥️♥️🫂",
              "انا بصراحه كنت ببقى مهتم اني اعمل ويب سايت زي دا علشان يكون ذكرى ليا معاكي قبل ما يكون ذكرى ليكي♥️♥️🫂 ،بحس حاجه بتختصر السنه من ضحك وهزار وكلام وخروج وسينما واماكن روحناها مليون مره واماكن روحناها مره وكل حاجه في السنه وعلشان لو في يوم نسينا احنا مين يكون في حاجه تفكرنا بإحنا إيه مع بعض 🥰🫂♥️",
              "تفكرنا بعلاقتنا المميزة اللي ملهاش علاقه بحد ولا عمر كان حد مرجع لينا ✨♥️",
              "على فكرة احنا بقالنا سنة (على الاقل مقطعناش مع بعض كلام ولو يوم واحد) انا متأكد انه اكتر من سنة بكتير ومفتكرش لينا يوم قطعنا فيه كلام مع بعض خالص علشان خناق مثلاً (حبيت اخلي دا في الرسالة دي برضو علشان يكون بيفكرنا ببعضنا) 😘😘♥️",
              "عاوز اقولك اني بحبك وبموت فيكي وبعشقك وبدوب في جمالك وعيونك وبدوب فيكي وانتي في الجيم وبتسحر لما بشوفك بتهزري وبتضحكي وكويسة ♥️♥️♥️♥️♥️🫂🫂🫂🫂",
              "كل مكالمه بينا طويلة، كل حاجه بتحكيها لي مش الطبيعي بتتحكي، كل خبر بتعرفيه وبتبقي مستنية اصحى كده علشان تقوليه لي..",
              "كل حاجه بنتشاركها سوا كل فيلم بنشوفه كل دا بيخليني بدوب فيكي اكتر واكتر ♥️🫂🫂وعارف اني معايا بنت متتعوضش ولا في بنات الدنيا كلها وبتعرفني قد إيه احنا سوا سوا في كل حاجه ♥️♥️🫂",
              "وعاوز اقول صحيح اني بعشق صورررررررك وليكي صورة بتكوني فيها بجد تحفة التحف والله وعاوز اقول اني بحب اوي صورتك اللي في محفظتي وبصراحة هي حاجه مميزة اوي واول مرة في حياتي كنت اتخيل اني هحط صورة بنت في محفظتي.. وهتظلي الشخص الوحيد اللي صورته اتحطت في محفظتي ♥️♥️🫂",
              "محتاج اقول تاني اني مستني اعياد ميلادنا سوا في بيوتنا في حضن بعض مستني ذكرياتنا واحنا عايشين جو لبس بعض ♥️😂😂",
              "مستني حاجات كتير اوي معاكي سواء دلوقتي او بعد الخطوبه او بعد الجواز وبجد حاسس ان الجواز منك هيكون طوق النجاه لحياه اريح من الضغوطات♥️🫂 اتمني دا بصراحه واتمني يكون ليكي برضو طوق نجاه من كل الزهق والزعيق اللي بتلاقيهم ويكون بيتنا عادي عسول زيك واجيب منك عيال عسولين وتحفه شبهك ♥️♥️😘",
              "عاوز اقولك ان كل يوم بحبك أكتر من اللي قبله، وكل سنة بتعدّي معاكي بحس إن قلبي لقى بيته جنبك🫂🫂♥️",
              "تاني عيد ميلاد ليكي واحنا بنحب بعض تقريبا السادس عموما معاكي حوالي 30 في الميه من حياتك كلها علي بعض فبصراحه حاجه تحفه وعقبال العمر كله 🫂🫂♥️",
              "ان شاء الله اليوم انهارده يكون عجبك، ويكون الفيلم عجبك والمفاجأه عجبتك عموما وان اليوم خلاكي افضل نفسينا كده ويكون عيدميلاد مميز ليكي 🫂♥️ معرفش ايه الامنيات اللي اتمنيتيها بس اتمني لو اقدر احققهالك في يوم اكون سبب فيها.. انا امنيتي ان اتجوزك وافضل طول عمري عايش بحمد ربنا اني اتجوزتك 🫂♥️",
              "عاوز اقول اني مقدر علاقتنا جدا فوق ما تتخيلي، مقدر حبنا لبعض خوفنا علي بعض، مقدر اننا ونس لبعض 🫂♥️♥️",
              "عاوز ابوسك واحضنك قد كدااااااااا ونكمل اليوم كله انستا في انستا واخدك في حضني في الاخر ونخش ننام سوا ♥️♥️🫂",
              "كل سنه وانتي طيبه يا حبيبتي وعقبال مليووووووووووووووووووووووووووووووووووووون سنه وانتي معايا وفي حضني واحنا مصدر الدفا لبعض وعمر ما حاجه تأثر في علاقتنا ♥️♥️🫂" ]}
                      speed={32}
          />
        </motion.div>

        {/* Open When Envelopes */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl font-semibold text-foreground text-center mb-8">Open When...</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {envelopes.map((env, i) => (
              <Envelope key={i} {...env} />
            ))}
          </div>
        </motion.div>

        {/* Time Machine */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl font-semibold text-foreground mb-6">The Time Machine</h3>
          <div className="flex justify-center">
            <TimeMachineButton url="https://ahmedyasser1588.github.io/Brith-Day-Esraa/" />
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="text-center pt-12 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-display text-lg text-foreground mb-1">Made with your Love</p>
          <Heart className="w-5 h-5 text-accent fill-accent mx-auto mb-1 animate-float" />
          <p className="text-xs text-muted-foreground font-body">For the most special person</p>
        </motion.footer>
      </div>
    </section>
  );
};

export default CelebrationPage;