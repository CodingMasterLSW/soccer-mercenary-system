
import React, { useState, useEffect } from 'react';
import { Bell, MapPin, Clock, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import NotificationBanner from '@/components/NotificationBanner';
import RecruitmentDetail from '@/components/RecruitmentDetail';

const Index = () => {
  const [showNotification, setShowNotification] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [applicationCount, setApplicationCount] = useState(0);
  const { toast } = useToast();

  // Mock recruitment data
  const recruitmentData = {
    id: 1,
    title: "강남구 선릉역 풋살장 용병 구함!",
    teamName: "FC 선릉유나이티드",
    date: "2025년 7월 15일",
    time: "19:00 - 21:00",
    location: "선릉역 풋살파크 (서울시 강남구 선릉로 123)",
    requiredPlayers: 2,
    currentApplications: applicationCount,
    description: "매너 좋으신 분들 환영합니다! 초보자도 가능하며, 함께 즐겁게 축구해요! 샤워실 완비되어 있고, 주차도 가능합니다.",
    requirements: ["매너 필수", "초보 환영", "19세 이상"]
  };

  const handleNotificationClick = () => {
    setCurrentView('detail');
    setShowNotification(false);
  };

  const handleApplicationSubmit = () => {
    setApplicationCount(prev => prev + 1);
    toast({
      title: "용병 신청 완료!",
      description: "팀 모집자가 승인 후 연락드릴 예정입니다.",
      duration: 3000,
    });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  if (currentView === 'detail') {
    return (
      <RecruitmentDetail 
        data={recruitmentData}
        onApplicationSubmit={handleApplicationSubmit}
        onBack={handleBackToHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      {showNotification && (
        <NotificationBanner 
          onClick={handleNotificationClick}
          onClose={() => setShowNotification(false)}
        />
      )}
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4">
            <span className="text-2xl">⚽</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">축구 용병 매칭</h1>
          <p className="text-lg text-gray-600">퇴근 후 축구를 즐기고 싶으신가요?</p>
        </div>

        {/* User Profile Section */}
        <Card className="mb-8 border-2 border-emerald-200 shadow-lg">
          <CardHeader className="bg-emerald-50">
            <CardTitle className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                이
              </div>
              <div>
                <h2 className="text-xl">이성우님, 안녕하세요!</h2>
                <p className="text-sm text-gray-600">용병 등록 완료 상태</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-500" />
                <span className="text-sm">활동 지역: 강남구</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-500" />
                <span className="text-sm">포지션: MF/FW</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                  용병 등록 완료
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="w-5 h-5 text-blue-500" />
                새로운 알림
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                근처에서 용병을 구하는 팀이 있습니다!
              </p>
              <Button 
                onClick={handleNotificationClick}
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                알림 확인하기
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="w-5 h-5 text-purple-500" />
                이번 주 경기
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                참여 예정인 경기가 없습니다.
              </p>
              <Button variant="outline" className="w-full">
                경기 찾아보기
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-5 h-5 text-orange-500" />
                내 활동 기록
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">참여 경기</span>
                  <span className="font-semibold">12경기</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">평점</span>
                  <span className="font-semibold text-emerald-600">4.8⭐</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">빠른 액세스</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-emerald-500 hover:bg-emerald-600 px-8"
              onClick={handleNotificationClick}
            >
              ⚽ 용병 모집글 보기
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              📍 내 주변 경기장
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              👥 팀 찾기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
