import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarRating } from '../components/StarRating';
import { TagSelector } from '../components/TagSelector';
import { apiService } from '../services/apiService';
import { Stylist, CreateReviewInput } from '../types';
import { Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';

type Step = 'stylist' | 'rating' | 'tags' | 'comment' | 'success';

export const FeedbackWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('stylist');
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateReviewInput>({
    visitId: `VISIT-${Date.now()}`,
    stylistId: '',
    rating: 0,
    tags: [],
    comment: '',
  });

  useEffect(() => {
    loadStylists();
  }, []);

  const loadStylists = async () => {
    try {
      setLoading(true);
      const data = await apiService.getStylists();
      setStylists(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load stylists');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 'stylist' && !formData.stylistId) {
      setError('Please select a stylist');
      return;
    }
    if (step === 'rating' && formData.rating === 0) {
      setError('Please provide a rating');
      return;
    }
    setError(null);
    const steps: Step[] = ['stylist', 'rating', 'tags', 'comment'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: Step[] = ['stylist', 'rating', 'tags', 'comment'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);
      await apiService.createReview(formData);
      setStep('success');
    } catch (err: any) {
      setError(err.message || 'Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

  const stepProgress = {
    stylist: 1,
    rating: 2,
    tags: 3,
    comment: 4,
    success: 5,
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-gold to-white flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center">
          <CheckCircle2 className="w-16 h-16 text-success-green mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary-black mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">Your feedback has been submitted successfully.</p>
          <button onClick={() => navigate('/')} className="btn-primary w-full">
            Submit Another Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-gold to-white">
      <div className="max-w-md mx-auto p-4 pt-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary-black">
              Step {stepProgress[step]} of 4
            </span>
            <button
              onClick={() => navigate('/')}
              className="text-primary-black hover:text-primary-gold"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="w-full bg-border-gray rounded-full h-2">
            <div
              className="bg-primary-gold h-2 rounded-full transition-all duration-300"
              style={{ width: `${(stepProgress[step] / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="card">
          {error && (
            <div className="mb-4 p-3 bg-error-red/10 border border-error-red rounded-lg text-error-red text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Stylist Selection */}
          {step === 'stylist' && (
            <div className="space-y-6 animate-slide-in">
              <h2 className="text-2xl font-bold text-primary-black">Who served you today?</h2>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary-gold" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {stylists.map((stylist) => (
                    <button
                      key={stylist.id}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, stylistId: stylist.id });
                        setError(null);
                      }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.stylistId === stylist.id
                          ? 'border-primary-gold bg-soft-gold'
                          : 'border-border-gray hover:border-primary-gold'
                      }`}
                    >
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-neutral-gray flex items-center justify-center overflow-hidden">
                        {stylist.avatarUrl ? (
                          <img src={stylist.avatarUrl} alt={stylist.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl">{stylist.name.charAt(0)}</span>
                        )}
                      </div>
                      <p className="font-semibold text-sm">{stylist.name}</p>
                      <p className="text-xs text-gray-600">{stylist.specialty}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Rating */}
          {step === 'rating' && (
            <div className="space-y-6 animate-slide-in">
              <h2 className="text-2xl font-bold text-primary-black">How was your experience?</h2>
              <div className="flex justify-center py-8">
                <StarRating
                  rating={formData.rating}
                  onRatingChange={(rating) => {
                    setFormData({ ...formData, rating });
                    setError(null);
                  }}
                  size="lg"
                />
              </div>
              {formData.rating > 0 && (
                <p className="text-center text-gray-600">
                  {formData.rating === 5
                    ? 'Excellent!'
                    : formData.rating === 4
                    ? 'Great!'
                    : formData.rating === 3
                    ? 'Good'
                    : formData.rating === 2
                    ? 'Fair'
                    : 'Poor'}
                </p>
              )}
            </div>
          )}

          {/* Step 3: Tags */}
          {step === 'tags' && (
            <div className="space-y-6 animate-slide-in">
              <h2 className="text-2xl font-bold text-primary-black">What stood out? (Optional)</h2>
              <TagSelector
                selectedTags={formData.tags || []}
                onTagsChange={(tags) => setFormData({ ...formData, tags })}
              />
            </div>
          )}

          {/* Step 4: Comment */}
          {step === 'comment' && (
            <div className="space-y-6 animate-slide-in">
              <h2 className="text-2xl font-bold text-primary-black">Any additional comments? (Optional)</h2>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="Tell us more about your experience..."
                className="input-field min-h-[120px] resize-none"
                maxLength={500}
              />
              <p className="text-sm text-gray-500 text-right">
                {formData.comment?.length || 0}/500
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          {step !== 'stylist' && step !== 'comment' && (
            <div className="flex gap-4 mt-8">
              <button onClick={handleBack} className="btn-secondary flex-1">
                Back
              </button>
              <button onClick={handleNext} className="btn-primary flex-1">
                Next
              </button>
            </div>
          )}

          {step === 'stylist' && (
            <button onClick={handleNext} className="btn-primary w-full mt-8">
              Next
            </button>
          )}

          {step === 'comment' && (
            <div className="flex gap-4 mt-8">
              <button onClick={handleBack} className="btn-secondary flex-1">
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
