
import React from 'react';
import { ArrowLeft, MapPin, Clock, Calendar, Users, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface RecruitmentData {
  id: number;
  title: string;
  teamName: string;
  date: string;
  time: string;
  location: string;
  requiredPlayers: number;
  currentApplications: number;
  description: string;
  requirements: string[];
}

interface RecruitmentDetailProps {
  data: RecruitmentData;
  onApplicationSubmit: () => void;
  onBack: () => void;
}

const RecruitmentDetail: React.FC<RecruitmentDetailProps> = ({ 
  data, 
  onApplicationSubmit, 
  onBack 
}) => {
  const remainingSlots = data.requiredPlayers - data.currentApplications;
  const isFullyBooked = remainingSlots <= 0;

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
          <h1 className="text-2xl font-bold text-gray-900">용병 모집 상세</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Card */}
            <Card className="border-2 border-emerald-200 shadow-lg">
              <CardHeader className="bg-emerald-50">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-gray-900 mb-2">
                      {data.title}
                    </CardTitle>
                    <p className="text-lg text-emerald-600 font-semibold">
                      {data.teamName}
                    </p>
                  </div>
                  <Badge 
                    variant={isFullyBooked ? "destructive" : "default"}
                    className={`${isFullyBooked ? '' : 'bg-emerald-500'} text-white`}
                  >
                    {isFullyBooked ? '모집완료' : '모집중'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-emerald-500" />
                    <span className="font-medium">{data.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-emerald-500" />
                    <span className="font-medium">{data.time}</span>
                  </div>
                  <div className="flex items-center gap-3 md:col-span-2">
                    <MapPin className="w-5 h-5 text-emerald-500" />
                    <span className="font-medium">{data.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  경기 정보 및 요구사항
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {data.description}
                </p>
                <Separator className="my-4" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">요구사항</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.requirements.map((req, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Status */}
            <Card className="border-2 border-emerald-200">
              <CardHeader className="bg-emerald-50">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-500" />
                  모집 현황
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">
                    {data.currentApplications} / {data.requiredPlayers}
                  </div>
                  <p className="text-gray-600">신청 인원</p>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min((data.currentApplications / data.requiredPlayers) * 100, 100)}%` }}
                  ></div>
                </div>

                <div className="text-center mb-6">
                  {remainingSlots > 0 ? (
                    <p className="text-gray-600">
                      <span className="font-semibold text-emerald-600">{remainingSlots}명</span> 더 필요해요!
                    </p>
                  ) : (
                    <p className="text-red-600 font-semibold">모집이 완료되었습니다</p>
                  )}
                </div>

                <Button 
                  onClick={onApplicationSubmit}
                  disabled={isFullyBooked}
                  className={`w-full h-12 text-lg font-semibold ${
                    isFullyBooked 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-emerald-500 hover:bg-emerald-600 transform hover:scale-105 transition-all duration-200'
                  }`}
                >
                  {isFullyBooked ? '모집 완료' : '⚽ 용병 신청하기'}
                </Button>
              </CardContent>
            </Card>

            {/* Team Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">팀 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">팀명</span>
                    <span className="font-medium">{data.teamName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">팀 Level</span>
                    <span className="font-medium text-emerald-600">Level 4 ⚽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">매치 횟수</span>
                    <span className="font-medium">28회</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">연락처 안내</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">
                  신청 후 팀 모집자가 승인하면 연락처가 공개됩니다. 
                  경기 1시간 전까지 최종 확인 연락을 드릴 예정입니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentDetail;
