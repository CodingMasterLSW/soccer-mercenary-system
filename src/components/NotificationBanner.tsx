
import React from 'react';
import { X, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationBannerProps {
  onClick: () => void;
  onClose: () => void;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ onClick, onClose }) => {
  return (
    <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg animate-in slide-in-from-top duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚽</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">새로운 용병 모집!</h3>
              <div className="flex items-center gap-4 text-sm opacity-90">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>강남구 선릉역</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>7월 15일 19:00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={onClick}
              className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold px-6"
            >
              지금 확인
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationBanner;
