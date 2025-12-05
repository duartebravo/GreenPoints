import ActionTemplate from "../models/ActionTemplate.js";

const templates = [
    // Reciclagem
    { category: "reciclagem", title: "Reciclar papel", description: "Reciclar jornais, revistas ou documentos", points: 50, icon: "📄" },
    { category: "reciclagem", title: "Reciclar plástico", description: "Reciclar garrafas e embalagens plásticas", points: 50, icon: "♻️" },
    { category: "reciclagem", title: "Reciclar vidro", description: "Reciclar garrafas e frascos de vidro", points: 50, icon: "🍾" },
    { category: "reciclagem", title: "Reciclar metal", description: "Reciclar latas e embalagens metálicas", points: 50, icon: "🥫" },
    { category: "reciclagem", title: "Reciclar eletrónicos", description: "Entregar equipamento eletrónico no local apropriado", points: 100, icon: "📱" },

    // Energia
    { category: "energia", title: "Desligar luzes", description: "Desligar luzes ao sair de um espaço", points: 30, icon: "💡" },
    { category: "energia", title: "Usar lâmpadas LED", description: "Substituir lâmpadas por LED", points: 80, icon: "🔆" },
    { category: "energia", title: "Desligar equipamentos", description: "Desligar equipamentos em standby", points: 40, icon: "🔌" },
    { category: "energia", title: "Reduzir climatização", description: "Diminuir uso de ar condicionado ou aquecimento", points: 60, icon: "🌡️" },
    { category: "energia", title: "Usar energia solar", description: "Carregar dispositivos com energia solar", points: 100, icon: "☀️" },

    // Água
    { category: "agua", title: "Banho curto", description: "Tomar banho com menos de 5 minutos", points: 50, icon: "🚿" },
    { category: "agua", title: "Fechar torneira", description: "Fechar torneira ao escovar os dentes", points: 30, icon: "🚰" },
    { category: "agua", title: "Reutilizar água", description: "Reutilizar água da chuva ou de lavagem", points: 70, icon: "💧" },
    { category: "agua", title: "Reparar fuga", description: "Reparar torneira ou canalização com fuga", points: 100, icon: "🔧" },
    { category: "agua", title: "Máquina cheia", description: "Usar máquina de lavar apenas com carga completa", points: 60, icon: "🧺" },

    // Transporte
    { category: "transporte", title: "Usar bicicleta", description: "Deslocar-se de bicicleta em vez de carro", points: 80, icon: "🚴" },
    { category: "transporte", title: "Transporte público", description: "Usar autocarro, comboio ou metro", points: 70, icon: "🚌" },
    { category: "transporte", title: "Caminhar", description: "Fazer percurso a pé", points: 50, icon: "🚶" },
    { category: "transporte", title: "Partilhar carro", description: "Fazer ou receber boleia", points: 90, icon: "🚗" },
    { category: "transporte", title: "Evitar voo", description: "Optar por transporte terrestre em vez de avião", points: 150, icon: "✈️" },

    // Consumo
    { category: "consumo", title: "Comprar local", description: "Comprar produtos de produtores locais", points: 60, icon: "🛒" },
    { category: "consumo", title: "Evitar desperdício", description: "Consumir toda a comida sem desperdiçar", points: 50, icon: "🍽️" },
    { category: "consumo", title: "Saco reutilizável", description: "Usar saco próprio nas compras", points: 40, icon: "🛍️" },
    { category: "consumo", title: "Produto sustentável", description: "Comprar produto com certificação ambiental", points: 70, icon: "🌿" },
    { category: "consumo", title: "Evitar plástico", description: "Escolher alternativas sem plástico descartável", points: 60, icon: "🚫" },

    // Comunidade
    { category: "comunidade", title: "Evento sustentável", description: "Participar em evento de sustentabilidade", points: 100, icon: "🌍" },
    { category: "comunidade", title: "Educar outros", description: "Ensinar práticas sustentáveis a outras pessoas", points: 80, icon: "👥" },
    { category: "comunidade", title: "Limpeza comunitária", description: "Participar em ação de limpeza de espaços públicos", points: 120, icon: "🧹" },
    { category: "comunidade", title: "Partilhar boleia", description: "Organizar ou participar em partilha de transporte", points: 70, icon: "🤝" },
    { category: "comunidade", title: "Voluntariado ambiental", description: "Participar em ação de voluntariado ambiental", points: 150, icon: "💚" }
];

export const seedActionTemplates = async () => {
    try {
        // Verificar se já existem templates
        const count = await ActionTemplate.countDocuments();

        if (count > 0) {
            console.log("⚠️  Templates já existem na base de dados. A saltar seed...");
            return;
        }

        // Inserir templates
        await ActionTemplate.insertMany(templates);
        console.log(`✅ ${templates.length} templates de ações criados com sucesso!`);
    } catch (error) {
        console.error("❌ Erro ao criar templates:", error.message);
        throw error;
    }
};
