import Layout from "@/components/Layout";

export default function IcebreakerPage() {
    return (
      <Layout>
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <h1 className="text-3xl font-bold mb-4">Icebreaker</h1>
        <p className="text-center mb-4">Un inconnu, des questions, un échange sans préjugés.</p>
        <span className="text-6xl">❄️</span>
        <button className="mt-6 px-6 py-2 bg-orange-500 text-white rounded">Commencer</button>
      </div>
      </Layout>
      );
  }
  