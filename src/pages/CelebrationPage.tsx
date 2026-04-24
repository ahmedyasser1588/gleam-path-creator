import { motion } from "framer-motion";
import VirtualCake from "@/components/VirtualCake";
import ScratchCard from "@/components/ScratchCard";
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
    <section className="min-h-screen py-24 px-4 bg-hero-gradient">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-body mb-3">Chapter Three</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient-rose mb-4">Let's Celebrate</h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">Make a wish and blow out the candles!</p>
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

        {/* Scratch Card */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl font-semibold text-foreground mb-6">A Special Surprise</h3>
          <div className="flex justify-center">
            <ScratchCard message="🎁 You are loved more than you know! Here's a virtual hug from everyone who adores you. 💖" />
          </div>
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
          <p className="font-display text-lg text-foreground mb-1">Made with</p>
          <Heart className="w-5 h-5 text-accent fill-accent mx-auto mb-1 animate-float" />
          <p className="text-xs text-muted-foreground font-body">For the most special person</p>
        </motion.footer>
      </div>
    </section>
  );
};

export default CelebrationPage;