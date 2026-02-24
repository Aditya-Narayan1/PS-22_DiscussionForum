import { useState, useCallback, useEffect } from 'react';

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try { const item = localStorage.getItem(key); return item ? JSON.parse(item) : initialValue; }
    catch { return initialValue; }
  });
  const setStoredValue = useCallback((newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }, [key]);
  return [value, setStoredValue];
}

export function useControlledForm(initialValues, validators = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  }, [errors]);

  const handleBlur = useCallback((field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (validators[field]) {
      const error = validators[field](values[field], values);
      setErrors((prev) => ({ ...prev, [field]: error || null }));
    }
  }, [validators, values]);

  const validate = useCallback(() => {
    const newErrors = {};
    Object.keys(validators).forEach((field) => {
      const error = validators[field](values[field], values);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    setTouched(Object.keys(validators).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
    return Object.keys(newErrors).length === 0;
  }, [validators, values]);

  const reset = useCallback(() => {
    setValues(initialValues); setErrors({}); setTouched({}); setIsSubmitting(false);
  }, [initialValues]);

  return { values, errors, touched, isSubmitting, setIsSubmitting, handleChange, handleBlur, validate, reset };
}
