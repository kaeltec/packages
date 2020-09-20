const Texts = {
  Steal: {
    'pt-BR': [
      'Você roubou **{{koins}}** de **{{user}}** <:KaelFeliz:702288213183692922>.',
      'Você se manteve calmo ao roubar **{{user}}** e conseguiu **{{koins}}** <:KaelFeliz:702288213183692922>.',
      'Você conseguiu fazer com que **{{user}}** entregasse todo o dinheiro! Você conseguiu **{{koins}}** <:KaelFeliz:702288213183692922>.',
    ],
  },
  StealFailed: {
    'pt-BR': [
      'Você ficou nervoso ao roubar **{{user}}**, com isso, perdeu **{{koins}}** <:KaelTriste:702288216480546839>.',
      'Você foi pego tentando roubar **{{user}}** e foi multado em **{{koins}}** <:KaelTriste:702288216480546839>.',
      'Você tentou roubar **{{koins}}** de **{{user}}** e, uma policia passou por perto e você foi preso <:KaelTriste:702288216480546839>.',
    ],
  },
  Work: {
    'pt-BR': [
      'Você lavou a louça e ganhou **{{koins}}**!',
      'Você trabalhou em casa e ganhou **{{koins}}**!',
      'Você ajudou uma velhinha na rua e ganhou **{{koins}}**!',
      "Você começou a trabalhar no McDonald's e ganhou **{{koins}}**!",
      'Você trabalha como um hacker profissional do Minecraft. Você consegue obter **{{koins}}**!',
      'Você trabalha em um mercado que vende maças por dia. Eles te pagaram **{{koins}}** por ajudá-los!',
      'Você trabalha em uma vinícola e esmaga uvas por algum tempo. Você é pago com **{{koins}}** e recebe uma garrafa de vinho!',
      'Você saiu para pescar acabou cambaleando em uma bota que tinha um colar dentro! Você o vendeu na loja de penhores e ganhou **{{koins}}**!',
    ],
  },
};

const Keys = Object.keys(Texts);

export default {
  Texts,
  Keys,

  Shuffle(
    type: keyof typeof Texts,
    language: string,
    replaces: Record<string, string> = {},
  ): string {
    if (!Keys.includes(type)) throw new TypeError('INVALID_TEXT_TYPE');

    const texts = Texts[type];
    const allTexts = texts[language] || texts['pt-BR'];

    let shuffledText = allTexts[Math.floor(Math.random() * allTexts.length)];

    // eslint-disable-next-line no-restricted-syntax
    for (const [replaceKey, replaceValue] of Object.entries(replaces)) {
      shuffledText = shuffledText.replace(
        new RegExp(`{{${replaceKey}}}`, 'gi'),
        replaceValue,
      );
    }

    return shuffledText;
  },
};
