import { AppLayout } from '@/components/AppLayout';
import UserProfileForm from '@/features/profile/components/UserProfileForm';

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="py-8 px-4">
          <UserProfileForm />
        </div>
      </div>
    </AppLayout>
  );
}
