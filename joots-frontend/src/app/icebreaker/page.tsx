import Layout from "@/components/Layout";
import OnlineUsersList from "@/components/icebreaker/OnlineUsersList";

export default function IcebreakerPage() {
    return (
      <Layout>
      <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur Icebreaker</h1>
      <OnlineUsersList />
    </div>
      </Layout>
      );
  }
  