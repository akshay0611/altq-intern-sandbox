import { useState } from 'react';

interface TagSelectorProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const availableTags = [
  'Great Service',
  'Friendly',
  'Professional',
  'Clean',
  'Fast',
  'Good Value',
  'Relaxing',
  'Hygiene',
  'Punctual',
  'Expert',
];

export const TagSelector = ({ selectedTags, onTagsChange }: TagSelectorProps) => {
  const [customTag, setCustomTag] = useState('');

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      onTagsChange([...selectedTags, customTag.trim()]);
      setCustomTag('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedTags.includes(tag)
                ? 'bg-primary-gold text-primary-black'
                : 'bg-neutral-gray text-primary-black hover:bg-border-gray'
            }`}
          >
            {selectedTags.includes(tag) ? '✓ ' : '+ '}
            {tag}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addCustomTag();
            }
          }}
          placeholder="Add custom tag..."
          className="input-field flex-1"
        />
        <button
          type="button"
          onClick={addCustomTag}
          className="btn-secondary px-4"
        >
          Add
        </button>
      </div>
    </div>
  );
};
