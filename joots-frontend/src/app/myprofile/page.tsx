import { AppLayout } from '@/components/AppLayout';
import MyProfileForm from '@/features/myprofile/components/MyProfileForm';

export default function MyProfilePage() {
  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="py-8 px-4">
          <MyProfileForm />
        </div>
      </div>
    </AppLayout>
  );
} 