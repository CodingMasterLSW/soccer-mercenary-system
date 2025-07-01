
import React, { useState } from 'react';
import { Plus, Users, Bell, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CreateRecruitment from '@/components/CreateRecruitment';
import ApplicationManagement from '@/components/ApplicationManagement';

const RecruitManager = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedRecruitment, setSelectedRecruitment] = useState<any>(null);
  const [recruitments, setRecruitments] = useState([
    {
      id: 1,
      title: "강남구 선릉역 풋살장 용병 구함!",
      teamName: "FC 선릉유나이티드",
      date: "2025-07-15",
      time: "19:00",
      location: "선릉역 풋살파크",
      requiredPlayers: 2,
      currentApplications: 3,
      status: 'active',
      createdAt: '2025-07-01'
    }
  ]);

  const handleCreateSuccess = (data: any) => {
    setRecruitments(prev => [data, ...prev]);
    setCurrentView('home');
  };

  const handleViewApplications = (recruitment: any) => {
    setSelectedRecruitment(recruitment);
    setCurrentView('applications');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedRecruitment(null);
  };

  if (currentView === 'create') {
    return (
      <CreateRecruitment 
        onBack={handleBackToHome}
        onSubmitSuccess={handleCreateSuccess}
      />
    );
  }

  if (currentView === 'applications' && selectedRecruitment) {
    return (
      <ApplicationManagement 
        onBack={handleBackToHome}
        recruitmentTitle={selectedRecruitment.title}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4">
            <span className="text-2xl">⚽</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">용병 모집 관리</h1>
          <p className="text-lg text-gray-600">이현복님의 모집 관리 페이지</p>
        </div>

        {/* Manager Profile */}
        <Card className="mb-8 border-2 border-emerald-200 shadow-lg">
          <CardHeader className="bg-emerald-50">
            <CardTitle className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                이
              </div>
              <div>
                <h2 className="text-xl">이현복님 (팀 매니저)</h2>
                <p className="text-sm text-gray-600">조기축구 매니아 • 42세</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-500" />
                <span className="text-sm">운영 경력: 3년</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-500" />
                <span className="text-sm">총 모집: 47회</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-emerald-500" />
                <span className="text-sm">팀 Level: 4 (아마추어 경기 자주 함)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-100 text-emerald-700">
                  인증된 매니저
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mb-8">
          <Button 
            onClick={() => setCurrentView('create')}
            size="lg" 
            className="bg-emerald-500 hover:bg-emerald-600 px-8"
          >
            <Plus className="w-5 h-5 mr-2" />
            새 용병 모집글 작성
          </Button>
        </div>

        {/* Active Recruitments */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">내 모집글</h3>
          
          {recruitments.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">아직 모집글이 없습니다</h3>
                <p className="text-gray-600 mb-4">첫 번째 용병 모집글을 작성해보세요!</p>
                <Button 
                  onClick={() => setCurrentView('create')}
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  모집글 작성하기
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recruitments.map((recruitment) => (
                <Card key={recruitment.id} className="border-2 border-emerald-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg mb-2">{recruitment.title}</CardTitle>
                        <p className="text-emerald-600 font-semibold">{recruitment.teamName}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">모집중</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{recruitment.date} {recruitment.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>
                          {recruitment.currentApplications}/{recruitment.requiredPlayers} 지원
                          {recruitment.currentApplications > 0 && (
                            <Bell className="w-4 h-4 ml-1 text-orange-500 inline" />
                          )}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleViewApplications(recruitment)}
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                      >
                        지원자 관리
                        {recruitment.currentApplications > 0 && (
                          <Badge className="ml-2 bg-orange-100 text-orange-700 text-xs">
                            {recruitment.currentApplications}
                          </Badge>
                        )}
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600"
                      >
                        수정
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruitManager;
