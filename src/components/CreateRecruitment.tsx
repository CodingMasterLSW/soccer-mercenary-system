
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Calendar, Users, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface CreateRecruitmentProps {
  onBack: () => void;
  onSubmitSuccess: (data: any) => void;
}

const CreateRecruitment: React.FC<CreateRecruitmentProps> = ({ onBack, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    teamName: '',
    date: '',
    time: '',
    location: '',
    requiredPlayers: 1,
    description: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.teamName || !formData.date || !formData.time || !formData.location) {
      toast({
        title: "필수 정보를 입력해주세요",
        description: "모든 필수 항목을 작성해야 합니다.",
        variant: "destructive"
      });
      return;
    }

    const recruitmentData = {
      ...formData,
      id: Date.now(),
      currentApplications: 0,
      requirements: ['매너 필수', '초보 환영', '19세 이상'],
      createdAt: new Date().toISOString()
    };

    onSubmitSuccess(recruitmentData);
    
    toast({
      title: "용병 모집글이 등록되었습니다!",
      description: "등록된 용병들에게 알림이 발송됩니다.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            onClick={onBack}
            variant="ghost" 
            size="icon"
            className="hover:bg-white hover:bg-opacity-50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">용병 모집글 작성</h1>
        </div>

        <Card className="max-w-2xl mx-auto border-2 border-emerald-200 shadow-lg">
          <CardHeader className="bg-emerald-50">
            <CardTitle className="flex items-center gap-2">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl">용병 모집글 작성</h2>
                <p className="text-sm text-gray-600">필요한 정보를 입력해주세요</p>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">제목 *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="예: 강남구 선릉역 풋살장 용병 구함!"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="teamName">팀명 *</Label>
                  <Input
                    id="teamName"
                    value={formData.teamName}
                    onChange={(e) => handleInputChange('teamName', e.target.value)}
                    placeholder="예: FC 선릉유나이티드"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">경기 날짜 *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="time">경기 시간 *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">경기장 위치 *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="예: 선릉역 풋살파크 (서울시 강남구 선릉로 123)"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="requiredPlayers">필요 인원</Label>
                <Input
                  id="requiredPlayers"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.requiredPlayers}
                  onChange={(e) => handleInputChange('requiredPlayers', parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">경기 정보 및 요구사항</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="매너 좋으신 분들 환영합니다! 초보자도 가능하며, 함께 즐겁게 축구해요!"
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md resize-none h-24"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onBack}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button 
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                >
                  <Save className="w-4 h-4 mr-2" />
                  모집글 등록
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateRecruitment;
