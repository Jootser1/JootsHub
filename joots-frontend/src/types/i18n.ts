export type Locale = 'en-US' | 'fr-FR' | 'es-ES'

export interface Dictionary {
  common: {
    welcome: string
    login: string
    logout: string
    settings: string
    profile: string
    conversations: string
    save: string
    send: string
    hub: string
    loading: string
    error: string
    success: string
    close: string
    online: string
    offline: string
    not_defined: string
    not_connected: string
    choose: string
    level: string
  }
  auth: {
    signin: string
    signup: string
    email: string
    password: string
    forgot_password: string
    remember_me: string
  }
  navigation: {
    home: string
    dashboard: string
    back: string
    next: string
    previous: string
    previous_app: string
    next_app: string
  }
  settings: {
    title: string
    chat_preferences: string
    accept_strangers: string
    accept_strangers_desc: string
    account: string
    username: string
    client_id: string
    notifications: string
    push_notifications: string
    push_notifications_desc: string
    error_updating_preference: string
    language: string
    language_desc: string
    languages: {
      'fr-FR': string
      'en-US': string
      'es-ES': string
    }
  }
  hub: {
    apps: {
      icebreaker: {
        title: string
        description: string
      }
      socioscopy: {
        title: string
        description: string
      }
      revelio: {
        title: string
        description: string
      }
    }
    start: string
    coming_soon: string
    aria: {
      previous_app: string
      next_app: string
      go_to_app: string
    }
  }
  icebreaker: {
    title: string
    new_adventure: string
    new_short: string
    friends: string
    rediscover_friend: string
    filters: string
    new_contact_criteria: string
    search: string
    searching: string
  }
  chat: {
    write_message: string
    reconnecting: string
    conversation_not_found: string
    user_not_connected: string
    user_not_found: string
    error_loading_conversation: string
    typing: string
    online: string
    offline: string
    error_loading_conversations: string
    no_conversations: string
    start_new_conversation: string
    disconnected: string
    unable_to_send: string
    send_error: string
  }
  profile: {
    city_placeholder: string
    passion_placeholder: string
    origin_placeholder: string
    job_placeholder: string
    quality_placeholder: string
    flaw_placeholder: string
    bio_placeholder: string
    copy_id: string
  }
  poc: {
    title: string
    description: string
    global_progress: string
    anonymous: string
    threshold: string
    revealed: string
    alternative_approaches: string
    show_tests: string
    hide_tests: string
  }
  menu: {
    client_id: string
    copy_id: string
    standard_pass: string
    notifications: string
    badges: string
    tips: string
    shop: string
    disconnect: string
  }
  profile_form: {
    change_photo: string
    age_range: string
    gender: string
    male: string
    female: string
    non_binary: string
    city: string
    passions: string
    passion_placeholder: string
    cultural_origin: string
    job: string
    greatest_quality: string
    biggest_flaw: string
    sexual_orientation: string
    orientations: {
      heterosexual: string
      homosexual: string
      bisexual: string
      asexual: string
      pansexual: string
      other: string
      prefer_not_say: string
    }
    bio: string
    profile_updated: string
  }
  conversation_modal: {
    title: string
    conversation_level: string
    revealed_info: string
    discovered_percent: string
    to_discover: string
    to_unlock: string
    no_info_revealed: string
    keep_chatting: string
    additional_info: string
    failed_to_load: string
    attributes: {
      CITY: string
      AGE: string
      GENDER: string
      JOB: string
      ORIGIN: string
      ORIENTATION: string
      PASSIONS: string
      QUALITY: string
      FLAW: string
      BIO: string
    }
  }
} 