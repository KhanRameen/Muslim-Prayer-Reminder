
# Muslim Prayer Reminder - Chrome Extension
![Platform](https://img.shields.io/badge/platform-Chrome-blue)
![Status](https://img.shields.io/badge/status-Live-success)
 <!-- ![License](https://img.shields.io/badge/license-MIT-green) -->

 🔗 **Install** : 
 **[Muslim Prayer Reminder - Chrome Web Store](https://chromewebstore.google.com/detail/njmemablbgdiohbddhlfdknfgdjdhebb?utm_source=item-share-cb)**


 
A lightweight and intelligent Chrome Extension that provides **accurate daily prayer times**, **real-time updates**, and **smart notifications** to help you stay consistent with your prayers.



---

## Features

* **Accurate Prayer Times**
  * Fetches daily prayer timings based on your selected **city, country, and calculation method** using the Aladhan API.

* **Smart Notifications**

  * On-time prayer reminders
  * Optional snooze functionality
  * Prevents outdated or incorrect notifications

* **Real-Time Prayer Tracking**

  * Displays **current prayer**
  * Shows **time remaining until next prayer**

* **Automatic Data Refresh**

  * Updates prayer data at midnight
  * Includes fallback hourly refresh for reliability

* **Manual Refresh**

  * Retry fetching data instantly if an error occurs

* **Custom Settings**

  * Select country & city
  * Choose calculation method
  * Adjust prayer timing offsets

* **Resilient System Design**

  * Handles offline scenarios
  * Recovers automatically after browser restart
  * Prevents duplicate alarms

---

## Tech Stack

* **Frontend:** React + TypeScript
* **Extension APIs:** Chrome Extensions API (Storage, Alarms, Notifications, Runtime)
* **UI Components:** Custom + shadcn/ui
* **API:** [Aladhan Prayer Times API](https://aladhan.com/prayer-times-api)

---

## How It Works

1. User sets location and preferences
2. Extension fetches:

   * Today’s prayer times
   * Yesterday’s Isha
   * Tomorrow’s Fajr
3. A **timeline engine** determines:

   * Current prayer
   * Next prayer
4. Background script:

   * Schedules alarms for each prayer
   * Handles notifications and snooze logic
5. System auto-recovers:

   * On browser restart
   * If data becomes stale
   * If API fails

---

## Installation (Development)

1. Clone the repository:

   ```bash
   git clone https://github.com/KhanRameen/Prayer-Reminder-Chrome-Extension
   cd Prayer-Reminder-Chrome-Extension
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the extension:

   ```bash
   npm run build
   ```

4. Load into Chrome:

   * Go to `chrome://extensions/`
   * Enable **Developer Mode**
   * Click **Load unpacked**
   * Select the `dist` folder

---

## Project Structure

```
src/
│
├── background/        # Background service worker
├── components/        # React UI components
├── popup/             # Extension popup UI
├── utils/             # Helper functions (timeline, time calculations)
├── types/             # TypeScript types
└── assets/            # Icons and static files
```

---

## Core Concepts

### Prayer Timeline Engine

Builds a continuous timeline including:

* Yesterday’s Isha
* Today’s prayers
* Tomorrow’s Fajr

Ensures correct behavior across:

* Midnight transitions
* Late app openings
* Time comparisons

---

### Alarm System

* Uses `chrome.alarms`
* Each alarm contains:

  * Prayer time
  * Next prayer time
* Prevents:

  * Duplicate alarms
  * Stale notifications

---

### Self-Healing Data Flow

The extension:

* Detects stale or missing data
* Automatically refetches
* Allows manual refresh from UI

---

## Error Handling

* Displays an error screen when data fails to load
* Provides a **manual refresh button**
* Automatically retries API calls
* Gracefully handles:

  * No internet
  * API failures
  * Missing user settings

<!-- ---

## 📸 Screenshots

> *(Add screenshots here later)*

---

## 🔮 Future Improvements

* 🔊 Adhan audio notifications
* 🌍 Multi-city support
* 📱 Sync across devices
* 📊 Prayer tracking & streaks
* 🎨 UI/UX enhancements

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## 📄 License

This project is licensed under the MIT License.

--- -->

## Acknowledgements

* [Aladhan API](https://aladhan.com/) for prayer timings
* Open-source community for tools and inspiration


