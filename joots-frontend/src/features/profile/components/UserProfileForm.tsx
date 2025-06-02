'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar } from '../../../components/ui/Avatar';
import { Button } from '../../../components/ui/Button';
import { useUserStore } from '@/features/user/stores/user-store';
import axiosInstance  from '../../../app/api/axios-instance';

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
    axiosInstance.get('/profile')
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
    await axiosInstance.put('/profile', payload);
    setProfile(payload);
  };

  return { profile, updateProfile, loading, error };
}

export default function UserProfileForm() {
  const { profile, updateProfile, loading } = useUserProfile();
  const [form, setForm] = useState<UserProfileState>(initialState);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const { user } = useUserStore();

  // Mettre à jour le formulaire quand le profil est chargé
  useEffect(() => {
    if (!loading && profile) {
      console.log('Mise à jour du formulaire avec:', profile);
      setForm(profile);
      setAvatarUrl(profile.avatar || null);
    }
  }, [profile, loading]);

  const handleChange = (key: keyof UserProfileState, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handlePassionChange = (i: number, value: string) => {
    const updated = [...form.PASSIONS];
    updated[i] = value;
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
    alert("Profil mis à jour !");
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 font-sans">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">{user?.username}</h2>
      <div className="flex flex-col items-center mb-6">
        <Avatar>
          <img
            src={avatarPreview || avatarUrl || '/placeholder.svg'}
            alt="Avatar"
            className="rounded-full w-24 h-24 object-cover border-4 border-white shadow-md bg-gray-100 cursor-pointer"
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
          {avatarLoading ? 'Chargement...' : 'Changer la photo'}
        </button>
        
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Tranche d'âge</label>
            <select id="age" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" value={form.AGE} onChange={e => handleChange('AGE', e.target.value)}>
              <option value="">-- Choisir --</option>
              {['18-25','25-35','35-45','45-55','55-65','65-75','75+'].map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
            <div className="flex gap-4 mt-2">
              {['Homme','Femme','Non-Binaire'].map(g => (
                <label key={g} className="flex items-center gap-2 text-base text-gray-700">
                  <input
                    type="radio"
                    name="genre"
                    value={g}
                    checked={form.GENDER === g}
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
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
          <input id="city" type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" value={form.CITY} onChange={e => handleChange('CITY', e.target.value)} placeholder="Paris" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Passions</label>
          <div className="space-y-2">
            {form.PASSIONS.map((p, i) => (
              <input key={i} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" value={p} onChange={e => handlePassionChange(i, e.target.value)} placeholder={`Passion ${i+1}`} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">Origine culturelle</label>
            <input id="origin" type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" value={form.ORIGIN} onChange={e => handleChange('ORIGIN', e.target.value)} placeholder="Ex : Française" />
          </div>
          <div>
            <label htmlFor="job" className="block text-sm font-medium text-gray-700 mb-1">Métier</label>
            <input id="job" type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" value={form.JOB} onChange={e => handleChange('JOB', e.target.value)} placeholder="Ex : Enseignant" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-1">Plus grande qualité</label>
            <input id="quality" type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" value={form.QUALITY} onChange={e => handleChange('QUALITY', e.target.value)} placeholder="Ex : Empathie" />
          </div>
          
          <div>
            <label htmlFor="flaw" className="block text-sm font-medium text-gray-700 mb-1">Plus gros défaut</label>
            <input id="flaw" type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" value={form.FLAW} onChange={e => handleChange('FLAW', e.target.value)} placeholder="Ex : Impatience" />
          </div>
        </div>
        <div>
          <label htmlFor="orientation" className="block text-sm font-medium text-gray-700 mb-1">Orientation sexuelle</label>
          <select
            id="orientation"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            value={form.ORIENTATION}
            onChange={e => handleChange('ORIENTATION', e.target.value)}
          >
            <option value="">-- Choisir --</option>
            {['Hétérosexuel','Homosexuel','Bisexuel','Asexuel','Pansexuel','Autre','Préférer ne pas dire'].map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea id="bio" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 resize-none" rows={3} value={form.BIO} onChange={e => handleChange('BIO', e.target.value)} placeholder="Quelques mots sur vous..." />
        </div>
        <div className="pt-2">
          <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md text-lg transition">Sauvegarder</Button>
        </div>
      </form>
    </div>
  );
}
