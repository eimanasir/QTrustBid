import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Home, DollarSign, MapPin, Heart, CheckCircle } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import styles from './PersonalizationAssessment.module.css';

export const PersonalizationAssessment: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: [] as string[],
    budget: { min: '', max: '' },
    location: [] as string[],
    bedrooms: '',
    bathrooms: '',
    amenities: [] as string[],
    lifestyle: [] as string[],
  });

  const propertyTypes = ['House', 'Condo', 'Townhouse', 'Land', 'Commercial'];
  const locations = ['Urban', 'Suburban', 'Rural', 'Beachfront', 'Mountain'];
  const amenities = ['Pool', 'Gym', 'Parking', 'Garden', 'Security', 'Pet-Friendly'];
  const lifestyles = ['Family-Friendly', 'Investment', 'Retirement', 'First Home', 'Luxury'];

  const toggleSelection = (category: keyof typeof formData, value: string) => {
    const current = formData[category] as string[];
    if (current.includes(value)) {
      setFormData({ ...formData, [category]: current.filter(v => v !== value) });
    } else {
      setFormData({ ...formData, [category]: [...current, value] });
    }
  };

  const handleSubmit = () => {
    console.log('Assessment completed:', formData);
    // Save preferences and redirect
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles size={48} />
          <h1>Personalization Assessment</h1>
          <p>Help us find your perfect property</p>
          <div className={styles.progress}>
            <div className={styles.progressBar} style={{ width: `${(step / 5) * 100}%` }} />
          </div>
          <span className={styles.stepIndicator}>Step {step} of 5</span>
        </motion.div>

        <motion.div
          className={styles.form}
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {step === 1 && (
            <div className={styles.step}>
              <div className={styles.stepHeader}>
                <Home size={32} />
                <h2>What type of property are you looking for?</h2>
                <p>Select all that apply</p>
              </div>
              <div className={styles.optionsGrid}>
                {propertyTypes.map(type => (
                  <button
                    key={type}
                    className={`${styles.optionCard} ${formData.propertyType.includes(type) ? styles.selected : ''}`}
                    onClick={() => toggleSelection('propertyType', type)}
                  >
                    <Home size={24} />
                    <span>{type}</span>
                    {formData.propertyType.includes(type) && <CheckCircle className={styles.check} size={20} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.step}>
              <div className={styles.stepHeader}>
                <DollarSign size={32} />
                <h2>What's your budget range?</h2>
                <p>This helps us show you relevant properties</p>
              </div>
              <div className={styles.budgetInputs}>
                <Input
                  label="Minimum Budget"
                  type="number"
                  placeholder="300,000"
                  value={formData.budget.min}
                  onChange={(e) => setFormData({ ...formData, budget: { ...formData.budget, min: e.target.value } })}
                  icon={<DollarSign size={20} />}
                />
                <Input
                  label="Maximum Budget"
                  type="number"
                  placeholder="800,000"
                  value={formData.budget.max}
                  onChange={(e) => setFormData({ ...formData, budget: { ...formData.budget, max: e.target.value } })}
                  icon={<DollarSign size={20} />}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.step}>
              <div className={styles.stepHeader}>
                <MapPin size={32} />
                <h2>Preferred Location Type</h2>
                <p>Where do you want to live?</p>
              </div>
              <div className={styles.optionsGrid}>
                {locations.map(location => (
                  <button
                    key={location}
                    className={`${styles.optionCard} ${formData.location.includes(location) ? styles.selected : ''}`}
                    onClick={() => toggleSelection('location', location)}
                  >
                    <MapPin size={24} />
                    <span>{location}</span>
                    {formData.location.includes(location) && <CheckCircle className={styles.check} size={20} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className={styles.step}>
              <div className={styles.stepHeader}>
                <Heart size={32} />
                <h2>Must-Have Amenities</h2>
                <p>Select your essential features</p>
              </div>
              <div className={styles.optionsGrid}>
                {amenities.map(amenity => (
                  <button
                    key={amenity}
                    className={`${styles.optionCard} ${formData.amenities.includes(amenity) ? styles.selected : ''}`}
                    onClick={() => toggleSelection('amenities', amenity)}
                  >
                    <Heart size={24} />
                    <span>{amenity}</span>
                    {formData.amenities.includes(amenity) && <CheckCircle className={styles.check} size={20} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className={styles.step}>
              <div className={styles.stepHeader}>
                <Sparkles size={32} />
                <h2>Your Lifestyle</h2>
                <p>What best describes your situation?</p>
              </div>
              <div className={styles.optionsGrid}>
                {lifestyles.map(lifestyle => (
                  <button
                    key={lifestyle}
                    className={`${styles.optionCard} ${formData.lifestyle.includes(lifestyle) ? styles.selected : ''}`}
                    onClick={() => toggleSelection('lifestyle', lifestyle)}
                  >
                    <Sparkles size={24} />
                    <span>{lifestyle}</span>
                    {formData.lifestyle.includes(lifestyle) && <CheckCircle className={styles.check} size={20} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.actions}>
            {step > 1 && (
              <Button variant="ghost" size="large" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            {step < 5 ? (
              <Button variant="primary" size="large" onClick={() => setStep(step + 1)}>
                Next
              </Button>
            ) : (
              <Button variant="primary" size="large" onClick={handleSubmit}>
                Complete Assessment
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
