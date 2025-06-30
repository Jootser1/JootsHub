'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { Avatar } from '../../../components/ui/Avatar';
import { Button } from '../../../components/ui/Button';
import { useUserStore } from '@/features/user/stores/user-store';
import axiosInstance  from '../../../app/api/axios-instance';
import { useTranslations } from '@/contexts/TranslationContext';

type UserProfileState = {
  CITY: string;
  AGE: string;
  GENDER: string;
  JOB: string;
  ORIGIN: string;
  ORIENTATION: string;
  PASSIONS: string[];
  QUALITY: string;
  FLAW: string;
  BIO: string;
  avatar?: string | null;
};

const initialState: UserProfileState = {
  CITY: '',
  AGE: '',
  GENDER: '',
  JOB: '',
  ORIGIN: '',
  ORIENTATION: '',
  PASSIONS: ['', '', ''],
  QUALITY: '',
  FLAW: '',
  BIO: '',
  avatar: null,
};

export function useUserProfile() {
  const [profile, setProfile] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get('/myprofile')
      .then(res => {
        console.log('Données du profil reçues:', res.data);
        const profileData = { ...initialState, ...res.data };
        // S'assurer que PASSIONS est toujours un tableau de 3 éléments
        if (profileData.PASSIONS && Array.isArray(profileData.PASSIONS)) {
          profileData.PASSIONS = [
            ...profileData.PASSIONS,
            '', '', ''
          ].slice(0, 3);
        } else {
          profileData.PASSIONS = ['', '', ''];
        }
        console.log('Profil formaté:', profileData);
        setProfile(profileData);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const updateProfile = async (newProfile: UserProfileState) => {
    const payload = {
      ...newProfile,
      PASSIONS: newProfile.PASSIONS.filter(p => p),
    };
    await axiosInstance.put('/myprofile', payload);
    setProfile(payload);
  };

  return { profile, updateProfile, loading, error };
}

export default function MyProfileForm() {
  const { profile, updateProfile, loading } = useUserProfile();
  const [form, setForm] = useState<UserProfileState>(initialState);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const { user } = useUserStore();
  const { dictionary } = useTranslations();

  // Mettre à jour le formulaire quand le profil est chargé
  useEffect(() => {
    if (!loading && profile) {
      console.log('Mise à jour du formulaire avec:', profile);
      // S'assurer que PASSIONS est toujours un tableau de 3 éléments
      const formData = {
        ...profile,
        PASSIONS: profile.PASSIONS && Array.isArray(profile.PASSIONS) 
          ? [...profile.PASSIONS, '', '', ''].slice(0, 3)
          : ['', '', '']
      };
      console.log('Données du formulaire après formatage:', formData);
      setForm(formData);
      setAvatarUrl(profile.avatar || null);
    }
  }, [profile, loading]);

  const handleChange = (key: keyof UserProfileState, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handlePassionChange = (i: number, value: string) => {
    const currentPassions = form.PASSIONS && Array.isArray(form.PASSIONS) ? form.PASSIONS : ['', '', ''];
    const updated = [...currentPassions];
    updated[i] = value;
    console.log(`Mise à jour passion ${i}: "${value}"`, updated);
    setForm(prev => ({ ...prev, PASSIONS: updated }));
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview immédiat
    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatarPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    const formData = new FormData();
    formData.append('avatar', file);
    setAvatarLoading(true);
    try {
      const res = await fetch('/api/profile/avatar', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setAvatarUrl(data.url);
        setForm(prev => ({ ...prev, avatar: data.url }));
      }
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Inclure l'avatar dans la mise à jour du profil
    const formWithAvatar = { ...form, avatar: avatarUrl };
    await updateProfile(formWithAvatar);
    alert(dictionary.profile_form.profile_updated);
  };

  if (loading) return <p>{dictionary.common.loading}</p>;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 font-sans relative">
      {/* Bouton de fermeture */}
      <button
        type="button"
        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => window.history.back()}
        aria-label={dictionary.common.close}
      >
        <svg className="w-5 h-5 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">{user?.username}</h2>
      <div className="flex flex-col items-center mb-6">
        <Avatar>
          <img
            src={avatarPreview || avatarUrl || '/placeholder.svg'}
            alt="Avatar"
            className="rounded-full w-24 h-24 object-cover object-center border-4 border-white shadow-md bg-gray-100 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          />
        </Avatar>
        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleAvatarChange} />
        <button
          type="button"
          className="mt-2 text-blue-600 hover:underline text-sm font-medium focus:outline-none"
          onClick={() => fileInputRef.current?.click()}
          disabled={avatarLoading}
        >
          {avatarLoading ? dictionary.common.loading : dictionary.profile_form.change_photo}
        </button>
        
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">{dictionary.profile_form.age_range}</label>
            <select id="age" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" value={form.AGE} onChange={e => handleChange('AGE', e.target.value)}>
              <option value="">{dictionary.common.choose}</option>
              {['18-25','25-35','35-45','45-55','55-65','65-75','75+'].map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{dictionary.profile_form.gender}</label>
            <div className="flex gap-4 mt-2">
              {[dictionary.profile_form.male, dictionary.profile_form.female, dictionary.profile_form.non_binary].map((g, index) => (
                <label key={index} className="flex items-center gap-2 text-base text-gray-700">
                  <input
                    type="radio"
                    name="genre"
                    value={['Homme','Femme','Non-Binaire'][index]}
                    checked={form.GENDER === ['Homme','Femme','Non-Binaire'][index]}
                    onChange={e => handleChange('GENDER', e.target.value)}
                    className="accent-blue-600 w-4 h-4"
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">{dictionary.profile_form.city}</label>
          <input id="city" type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" value={form.CITY} onChange={e => handleChange('CITY', e.target.value)} placeholder={dictionary.profile.city_placeholder} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{dictionary.profile_form.passions}</label>
          <div className="space-y-2">
            {(form.PASSIONS && Array.isArray(form.PASSIONS) ? form.PASSIONS : ['', '', '']).map((p, i) => (
              <input key={i} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" value={p} onChange={e => handlePassionChange(i, e.target.value)} placeholder={`${dictionary.profile_form.passion_placeholder} ${i+1}`} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">{dictionary.profile_form.cultural_origin}</label>
            <input id="origin" type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" value={form.ORIGIN} onChange={e => handleChange('ORIGIN', e.target.value)} placeholder={dictionary.profile.origin_placeholder} />
          </div>
          <div>
            <label htmlFor="job" className="block text-sm font-medium text-gray-700 mb-1">{dictionary.profile_form.job}</label>
            <input id="job" type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" value={form.JOB} onChange={e => handleChange('JOB', e.target.value)} placeholder={dictionary.profile.job_placeholder} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-1">{dictionary.profile_form.greatest_quality}</label>
            <input id="quality" type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" value={form.QUALITY} onChange={e => handleChange('QUALITY', e.target.value)} placeholder={dictionary.profile.quality_placeholder} />
          </div>
          
          <div>
            <label htmlFor="flaw" className="block text-sm font-medium text-gray-700 mb-1">{dictionary.profile_form.biggest_flaw}</label>
            <input id="flaw" type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" value={form.FLAW} onChange={e => handleChange('FLAW', e.target.value)} placeholder={dictionary.profile.flaw_placeholder} />
          </div>
        </div>
        <div>
          <label htmlFor="orientation" className="block text-sm font-medium text-gray-700 mb-1">{dictionary.profile_form.sexual_orientation}</label>
          <select
            id="orientation"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            value={form.ORIENTATION}
            onChange={e => handleChange('ORIENTATION', e.target.value)}
          >
            <option value="">{dictionary.common.choose}</option>
            <option value="Hétérosexuel">{dictionary.profile_form.orientations.heterosexual}</option>
            <option value="Homosexuel">{dictionary.profile_form.orientations.homosexual}</option>
            <option value="Bisexuel">{dictionary.profile_form.orientations.bisexual}</option>
            <option value="Asexuel">{dictionary.profile_form.orientations.asexual}</option>
            <option value="Pansexuel">{dictionary.profile_form.orientations.pansexual}</option>
            <option value="Autre">{dictionary.profile_form.orientations.other}</option>
            <option value="Préférer ne pas dire">{dictionary.profile_form.orientations.prefer_not_say}</option>
          </select>
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">{dictionary.profile_form.bio}</label>
          <textarea id="bio" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 resize-none" rows={3} value={form.BIO} onChange={e => handleChange('BIO', e.target.value)} placeholder={dictionary.profile.bio_placeholder} />
        </div>
        <div className="pt-2">
          <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md text-lg transition">{dictionary.common.save}</Button>
        </div>
      </form>
    </div>
  );
} 